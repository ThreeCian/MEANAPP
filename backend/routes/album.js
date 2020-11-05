//modulos internos 
const express = require("express");
const router = express.Router();
//modulos propios 
const { Album } = require("../model/album");
const { Usuario } = require("../model/usuario");
const auth = require("../middleware/auth");
const cargarImagen = require("../middleware/file");
//listar las actividades
router.get("/lista", auth, async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id)
    // si no existe el susuario
    if (!usuario) return res.status(400).send("el usuario No existe en BD");
    //si el usuario existe
    const album = await Album.find({ idUsuario: req.usuario._id })
    res.send(album)
});
//ruta

router.post("/", auth, async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    //si el usuario no existe 
    if (!usuario) return res.status(400).send("El usuario no existe");
    //Si el usuario existe, creamos una actividad para ese usuario
    const album = new Album({
        idUsuario: usuario._id,
        nombre: req.body.nombre,
        imagen: req.body.imagen
    });
    //enviamos resultado
    const result = await album.save();
    res.status(200).send(result);
});
//Crear actividad de imagen
router.post("/cargarImagen", cargarImagen.single("imagen"), auth, async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    //validar si existe el usuario
    const usuario = await Usuario.findById(req.usuario._id)
    //si el usuario no existe
    if (!usuario) return res.status(400).send("el usuario no existe en bd");
    //si existe continua
    let rutaImagen = null;
    if (req.file.filename) {
        rutaImagen = url + "/public/" + req.file.filename;
    } else {
        rutaImagen = null;
    }
    //guardar la activifaf con la imagen en bd
    const album = new Album({
        idUsuario: usuario._id,
        nombre: req.body.nombre,
        imagen: rutaImagen
    });
    //enviamos resultado
    const result = await album.save();
    res.status(200).send(result);
});
//Actualizar actividad
router.put("/", auth, async (req, res) => {

    const usuario = await Usuario.findById(req.usuario._id);
    //si el usario no existe
    if (!usuario) return res.status(400).send("El usuario no existe en BD");
    //si el usuario existe
    const album = await Album.findByIdAndUpdate(
        req.body._id,//este es rl id de la actividad 
        {
            idUsuario: req.usuario._id,
            nombre: req.body.nombre,
            imagen: req.body.imagen
        },
        {
            new: true,
        }

    )
    if (!album) return res.status(400).send("No hay actividad asignada en este usuario")
    res.status(200).send(album);
});
//eliminar actividad
router.delete("/:_id"/*esto envía un parametro al link*/, auth, async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    //si no existe el usuario
    if (!usuario) return res.status(400).send("El usuario no existe en BD");
    //si existe eliminamos una actividad
    const album = await Album.findByIdAndDelete(req.params._id)/*este es el parametro del link */
    //si no existe esa actividad 
    if (!album) return res.status(400).send("No existe esta actividad para eliminar ")
    //si se elimina una tarea
    res.status(200).send({ message: "Actividad eliminada" })
})

module.exports = router;
