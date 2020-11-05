//modulos internos
const multer = require("multer");
// ruta del directorio donde se almacenan los archivos 
const directorio ="./public";
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,directorio);
    },
    filename: (req,file,cb)=>{
        const filename = 
        Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
        cb(null, filename)
    }
});
//Cargar archivos
const cargarImagen = multer({
    storage: storage,
    fileFilter:(req,file,cb) =>{
        if(file.mimetype =="image/jpg" || file.mimetype == "image/jpeg"||file.mimetype == "image/png" || file.mimetype=="image/gif"){
            cb(null, true)
        }else{
            cb(null,false)
            returncb(new Error("Solo se aceptan extensiones .jpg - .png - .gif"))
        
        }

    }
})
module.exports = cargarImagen;