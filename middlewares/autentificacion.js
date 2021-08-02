//verificación del token
import mongoose from 'mongoose';
import nota from '../models/nota'
const jwt = require('jsonwebtoken');

const verficationAuth = (req, res, next)=>{
// Leer headers
    let token= req.get('token');
    jwt.verify(token, 'secret', (err, decoded)=>{
        if(err){
            return res.status(401).json({
                mensaje: "usuario no valido",
            })
        }
        // Creamos una nueva propiedad con la info del usuario
        req.user = decoded.data;//data viene al generar el token en login.js
        next();
    })
};

const verifyAdministrator = (req, res, next) =>{
    const rol = req.user.rol;
    if(rol === 'ADMIN'){
        next();
    }else{
        return res.status(401).json({mensaje:'Usuario no valido'})
    }
}

module.exports= {verficationAuth, verifyAdministrator};


