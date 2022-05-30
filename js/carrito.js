class Carrito{

	carrito(){
		return JSON.parse(localStorage.getItem("carrito"));
	}

	static agregar(producto){
		let carrito=JSON.parse(localStorage.getItem("carrito"));
		let datos={
			"cantidad":1,
			"producto":producto
		};
		if(carrito==null){
			localStorage.setItem("carrito",JSON.stringify([datos]));
		}else{
			if(Carrito.buscar(producto.id)!=null){
				return false;
			}else{
				carrito.push(datos);
				localStorage.setItem("carrito",JSON.stringify(carrito));
			}
		}
		return true;
	}

	static buscar(id,carrito=JSON.parse(localStorage.getItem("carrito"))){
		for(let indice in carrito){
			if(carrito[indice].producto.id==id){
				return carrito[indice];
			}
		}
		return null;
	}

	static cantidad(id,operador){
		let datos=Carrito.buscar(id);
		if(datos==null){
			return false;
		}
		if(operador=="+"){
			datos.cantidad++;
		}else
		if(operador=="-"){
			if(datos.cantidad>1){
				datos.cantidad--;
			}
		}
		return Carrito.remplazar(datos);
	}

	static getCantidad(id){
		let producto=Carrito.buscar(id);
		if(producto==null){
			return 0;
		}
		return producto.cantidad;
	}

	static remplazar(datos){
		let carrito=JSON.parse(localStorage.getItem("carrito"));
		if(carrito==null){
			return;
		}
		let new_carrito=[];
		for(let carro of carrito){
			if(carro.producto.id==datos.producto.id){
				new_carrito.push(datos);
			}else{
				new_carrito.push(carro);
			}
		}
		localStorage.setItem("carrito",JSON.stringify(new_carrito));
		return true;
	}

	static eliminar(id){
		let carrito=JSON.parse(localStorage.getItem("carrito"));
		if(carrito==null){
			return;
		}
		let new_carrito=[];
		for(let carro of carrito){
			if(carro.producto.id!=id){
				new_carrito.push(carro);
			}
		}
		if(new_carrito.length>0){
			localStorage.setItem("carrito",JSON.stringify(new_carrito));
		}else{
			localStorage.setItem("carrito",null);
		}
		return true;
	}

	static totalPago(id=null){
		let carrito=JSON.parse(localStorage.getItem("carrito"))??null;
		if(carrito==null){
			return 0;
		}
		let totales=carrito.map(valor=>[valor.producto.id,valor.producto.precio*valor.cantidad]);
		if(id==null){
			if(totales.length>1){
				return totales.reduce((anterior,actual)=>anterior[1]+actual[1]);
			}else{
				return totales.reduce((anterior,actual)=>anterior[1]+actual[1])[1];
			}
		}else{
			let total=totales.filter(valor=>valor[0]==id);
			return total.length>0?total[0][1]:0;
		}
	}

}

var template_producto=document.getElementById('template_producto').content;
var template_comprar=document.getElementById('template_comprar').content;
var content_producto=document.getElementById('content_producto');
var content_comprar=document.getElementById('content_comprar');
var fragment=document.createDocumentFragment(); // Añadir elementos que no forman parte del DOM

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded',()=>{
	id=window.location.search.substr(1).split("=")[1]??null;
	if(id!=null){
		let producto=new Api().obtenerId(id);
		if(producto!=null){
			if(!Carrito.agregar(producto)){
				//Carrito.cantidad(producto.id,"+");
			}
			window.location.href="carrito.html";
			return;
		}
	}
    this.obtenerCarrito();
});

// Añadir elementos a la plantilla del carrito de compras
function obtenerCarrito(){
    let carrito=new Carrito().carrito();
    let total=0;
    if(carrito==null){
    	return;
    }
    carrito.reverse().forEach(datos=>{
    	let cantidad=datos.cantidad;
    	let producto=datos.producto;
    	let precio=Carrito.totalPago(producto.id);
    	this.template_producto.getElementById("producto").setAttribute("name","producto"+producto.id)
        this.template_producto.getElementById("img").src="img/"+producto.img;
        this.template_producto.getElementById("titulo").textContent=producto.titulo;
        this.template_producto.getElementById("descripcion").textContent=producto.descripcion;
        this.template_producto.getElementById("precio").textContent="$"+precio+" MXN";
        this.template_producto.getElementById("precio").setAttribute("name","precio"+producto.id);
        this.template_producto.getElementById("cantidad").textContent=cantidad;
        this.template_producto.getElementById("cantidad").setAttribute("name","cantidad"+producto.id);
        this.template_producto.getElementById('btn_menos').setAttribute("onclick","actualizarProducto('"+producto.id+"','-');");
        this.template_producto.getElementById('btn_mas').setAttribute("onclick","actualizarProducto('"+producto.id+"','+');");
        this.template_producto.getElementById('btn_quitar').setAttribute("onclick","actualizarProducto("+producto.id+")");
        let clone=this.template_producto.cloneNode(true);
        this.fragment.appendChild(clone);
        this.content_producto.appendChild(fragment);
        total+=precio;
    });
    let content_total=this.template_comprar.getElementById("total");
    content_total.textContent="Total: $"+total+" MXN";
    let content_comprar=this.template_comprar.getElementById("btn_comprar");
    let content_volver=this.template_comprar.getElementById("btn_volver");
    content_volver.setAttribute("onclick","window.location='index.html'");
    this.content_comprar.appendChild(content_total);
    this.content_comprar.appendChild(content_comprar);
    this.content_comprar.appendChild(content_volver);
}

function actualizarProducto(id,operador=""){
	switch(operador){
		case "+": Carrito.cantidad(id,'+'); break;
		case "-": Carrito.cantidad(id,'-'); break;
		case "": Carrito.eliminar(id);
					document.getElementsByName("producto"+id)[0].textContent="";
					if(new Carrito().carrito()==null){
						document.getElementById('content_comprar').innerHTML="";	
					}
					return;
					break;
	}
	document.getElementsByName("cantidad"+id)[0].textContent=Carrito.getCantidad(id);
	document.getElementsByName("precio"+id)[0].textContent="$"+Carrito.totalPago(id)+" MXN";
	document.getElementById("total").textContent="$"+Carrito.totalPago()+" MXN";
	console.log(Carrito.carrito);
}