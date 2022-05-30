class Api{

    constructor(){
        this.categorias=["Juegos","Consolas","Accesorio"];
        this.estados=["Nuevo","Reacondicionado"];
        this.productos=[
            {id:1,estado:this.estados[0],categoria:this.categorias[1],titulo:"Play station 5",precio:15000,img:"play_station_5.webp",
            descripcion:"dsa"},
            {id:2,estado:this.estados[0],categoria:this.categorias[2],titulo:"Control Play Station 5",precio:1500,img:"control_play_station_5.jpg",
            descripcion:""},
            {id:3,estado:this.estados[0],categoria:this.categorias[1],titulo:"Xbox Series X",precio:13999,img:"xbox_series_x.jpg",
            descripcion:""},
            {id:4,estado:this.estados[0],categoria:this.categorias[2],titulo:"Control Xbox One Series S/X",precio:1200,img:"control_xbox_series_x_s.webp",
            descripcion:""},
            {id:5,estado:this.estados[0],categoria:this.categorias[1],titulo:"Nintedo Switch",precio:9000,img:"nintendo_switch.jpg",
            descripcion:""},
            {id:6,estado:this.estados[0],categoria:this.categorias[0],titulo:"Gears of War 3 Xbox 360",precio:300,img:"gears_of_war_3_xbox_360.jpg",
            descripcion:""},
            {id:7,estado:this.estados[0],categoria:this.categorias[0],titulo:"Minecraft Xbox One",precio:1600,img:"minecraft_xbox_one.jpg",
            descripcion:""},
            {id:8,estado:this.estados[0],categoria:this.categorias[0],titulo:"Forza 5 Xbox One",precio:499,img:"forza_5_xbox_one.jpg",
            descripcion:""},
            {id:9,estado:this.estados[0],categoria:this.categorias[0],titulo:"GTA V Xbox 360",precio:790,img:"gtav_xbox_360.png",
            descripcion:""},
            {id:10,estado:this.estados[1],categoria:this.categorias[1],titulo:"Nintendo DS",precio:800,img:"nintendo_ds.jpg",
            descripcion:""},
            {id:11,estado:this.estados[0],categoria:this.categorias[1],titulo:"Xbox 360 Edición Kinect",precio:4000,img:"xbox_360_edicion_kinect.jpg",
            descripcion:""},
            {id:12,estado:this.estados[1],categoria:this.categorias[1],titulo:"Atari 2600",precio:4000,img:"atari_3600.jpg",
            descripcion:""},
            {id:13,estado:this.estados[0],categoria:this.categorias[2],titulo:"Mouse Gamecraft",precio:200,img:"mouse_gamecraft.jpeg",
            descripcion:""},
            {id:14,estado:this.estados[0],categoria:this.categorias[2],titulo:"Cascos Inalámbricos Xbox",precio:3499,img:"cascos_inalambricos_xbox.webp",
            descripcion:""}
        ]
    }

    obtenerId(id){
        for(let producto of this.productos){
            if(producto.id==id){
                return producto;
            }
        }
        return null;
    }

}