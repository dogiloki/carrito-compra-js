class Local{

	static agregar(key,value){
		localStorage.setItem(key,value);
	}

	static obtener(key){
		localStorage.getItem(key);
	}

	static eliminar(key){
		localStorage.remove(key);
	}

}