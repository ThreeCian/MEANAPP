//modulos internos y propiedad routes
const express = require("express");
const router = express.Router();
//modulos propios 

const {Usuario} = require("../model/usuario");
//ruta
router.post("/", async(req,res)=>{
    let usuario = await Usuario.findOne({correo: req.body.correo});
    //si se encuentra en BD
if (usuario) return res.status(400).send("el correo ya está registrado");
//si no existe
usuario = new Usuario({
    nombre:req.body.nombre,
    correo: req.body.correo,
    pass: req.body.pass
});
//se guarda el usuario en JWT
const result=usuario.save();
const jwToken = usuario.generateJWT();
res.status(200).send({jwToken});
});
//exportar
module.exports = router