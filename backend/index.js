//modulos internos 
const express = require("express");
const mongoose = require("mongoose");
//modulos porpios
const usuario = require("./routes/usuario");
const auth = require("./routes/auth");
const album = require("./routes/album");
//app
const app = express();
app.use(express.json());
app.use("/api/usuario/", usuario);
app.use("/api/auth/", auth);
app.use("/api/albumI/", album)

//puerto para ejecutr el servidor 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Ejecutando en el puerto:" + port));

//conexión a mongoDB
mongoose
    .connect("mongodb://localhost/album", {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Conexión a mongoDB: Online"))
    .catch((error) => console.log("Conexión a mongoDB: OffLine"));