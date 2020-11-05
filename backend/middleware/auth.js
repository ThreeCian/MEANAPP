//modulos internos 
const jwt = require("jsonwebtoken");
//validar loggeo de un uusario
function auth(req, res, next) {
    let jwToken = req.header("Authorization");
    //separación del bare
    jwToken = jwToken.split(" ")[1];
    //si el token no existe 
    if (!jwToken) return res.status(405).send("No hay token para acceder");
    //si el token existe
    try {
        const payload = jwt.verify(jwToken, "secret");
        req.usuario = payload;
        next();
    } catch (error) {
        res.status(405).send("Token sin autorización")
    }
}
module.exports = auth;