//modulos internos
const express = require("express");
const router = express.Router();

//modulos propios
const { Usuario } = require("../model/usuario");
// crar ruta

router.post("/", async (req, res) => {
    //validar que el correo exista
    const usuario = await Usuario.findOne({ correo: req.body.correo });
    //si el correo no existe
    if (!usuario) return res.status(400).send("Correo o contraseña incorrectos");
    //si el password no existe
    if (usuario.pass !== req.body.pass) return res.status(400).send("Correo o contraseña incorrectos");
    //generar un JSW
    const jwtToken = usuario.generateJWT();
    res.status(200).send({ jwtToken });
})
module.exports = router; 