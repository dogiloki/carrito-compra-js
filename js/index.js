function modal(op){
    if(document.getElementsByName(op)[0].style.display==''){
        document.getElementsByName(op)[0].style.display='none';
    }else{
        document.getElementsByName(op)[0].style.display='';
    }
}

var template_producto=document.getElementById('template_producto').content;
var content_juegos=document.getElementById('content_juegos');
var content_consolas=document.getElementById('content_consolas');
var content_accesorios=document.getElementById('content_accesorios');
var fragment=document.createDocumentFragment(); // Añadir elementos que no forman parte del DOM

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded',()=>{
    this.obtenerProductos();
});

// Añadir elementos a la plantilla del carrito de compras
function obtenerProductos(){
    let api=new Api();
    let data=api.productos;
    data.forEach(producto=>{
        this.template_producto.getElementById("img").src="img/"+producto.img;
        this.template_producto.getElementById("titulo").textContent=producto.titulo;
        this.template_producto.getElementById("precio").textContent="$"+producto.precio+" MXN";
        this.template_producto.getElementById("content_option").setAttribute("name","content_option"+producto.id);
        this.template_producto.getElementById("producto").setAttribute('onmouseover',"modal('content_option"+producto.id+"')");
        this.template_producto.getElementById("producto").setAttribute('onmouseout',"modal('content_option"+producto.id+"')");
        this.template_producto.getElementById("btn_carrito").setAttribute("onclick","window.location='carrito.html?id="+producto.id+"'");
        this.template_producto.getElementById("btn_detalles").setAttribute("onclick","window.location='carrito.html?id="+producto.id+"'");
        let clone=this.template_producto.cloneNode(true);
        this.fragment.appendChild(clone);
        switch(producto.categoria){
            case api.categorias[0]: this.content_juegos.appendChild(fragment); break;
            case api.categorias[1]: this.content_consolas.appendChild(fragment); break;
            case api.categorias[2]: this.content_accesorios.appendChild(fragment); break;
        }
    });
}