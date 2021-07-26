import express from 'express';
const router = express.Router();
const jwt = require('jsonwebtoken');

import user from '../models/user';
// Hash password
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post("/", async(req, res)=>{
    const body= req.body;
    try {
    // buscando el email en la Db
    const userDb = await user.findOne({email: body.email});
     // Evaluamos si existe el usuario en DB
    if(!userDb){
       return res.status(400).json({mensaje: "the password or the email are wrong"})
    }
    // Evaluamos la contraseña correcta
    if(!bcrypt.compareSync(body.pass, userDb.pass)){
        return res.status(400).json({mensaje: "the password or the email are wrong"})
    }
    // Generar Token
    let token = jwt.sign({
    data: userDb
    }, 'secret', { expiresIn: 60 * 60 * 24 * 30}) // Expira en 30 días
  
     // Pasó las validaciones
    return res.json({userDb, token})

} catch (error) {      
        return res.status(400).json({
        message: 'there is an err',
        error
    })

    }
})

module.exports = router;