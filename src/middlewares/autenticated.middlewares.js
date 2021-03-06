const jwt_simple = require('jwt-simple');
const moment = require('moment');
const claveSecreta = "clave_secreta_IN6BV";

exports.Auth = function (req, res, next) {
    if( !req.headers.authorization ){
        return res.status(500).send({ mensaje: "La peticion no tiene la cabecera de Authorization" });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt_simple.decode(token, claveSecreta);
        console.log(payload);
        // EXP = variable que contiene el tiempo de expiracion del token
        if(payload.exp <= moment().unix()){
            return res.status(500).send({ mensaje: "El token ha expirado."});
        }
    } catch (error) {
        return res.status(500).send({ mensaje: "El token no es valido."})
    }

    req.user = payload;
    next();
}

exports.ensureAuthAdmin = (req, res, next)=>{
    var payload = req.user;
        
    if(req.user.rol != 'ROL_Admin'){
        return res.status(500).send({ mensaje: "usted no tiene permisos para realizar esta accion"})
    }else{
       return next(); 
    }
}

exports.ensureAuthAdminHotel = (req, res, next)=>{
    var payload = req.user;
        
    if(req.user.rol != 'ROL_AdminHotel'){
        return res.status(500).send({ mensaje: "usted no tiene permisos para realizar esta accion"})
    }else{
       return next(); 
    }
}
exports.ensureAuthUser = (req, res, next)=>{
    var payload = req.user;
        
    if(req.user.rol != 'ROL_Usuario'){
        return res.status(500).send({ mensaje: "usted no tiene permisos para realizar esta accion"})
    }else{
       return next(); 
    }
}