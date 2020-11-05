//modulos internos 
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//Esquema
const esquemaUsuario = new mongoose.Schema({
    nombre: String,
    correo:String,
    pass:String
})
//generar JWT
esquemaUsuario.methods.generateJWT = function(){
    return jwt.sign({
        _id: this._id,
        correo: this.correo,
        pass: this.pass
    },
    "secret"
    );

};
//Exports
const Usuario = mongoose.model("usuario", esquemaUsuario)
module.exports.Usuario=Usuario;
