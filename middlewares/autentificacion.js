//verificación del token
import mongoose from 'mongoose';
const jwt = require('jsonwebtoken');

const verficationAuth = (req, res, next)=>{
// Leer headers
    let token= req.get('token');
    jwt.verify(token, 'secret', (err, decoded)=>{
        if(err){
            return res.status(400).json({
                mensaje: "usuario no valido",
            })
        }
        next();
    })
    
};
module.exports= {verficationAuth};