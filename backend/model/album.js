//modulos internos 
const mongoose =require("mongoose");
//esquema del album
const esquemaAlbum = new mongoose.Schema({
    idUsuario:String,
    nombre:String,
    imagen:String
});
//exportar
const Album = mongoose.model("album",esquemaAlbum);
module.exports.Album = Album;