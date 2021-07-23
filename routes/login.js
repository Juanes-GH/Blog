import express from 'express';
const router = express.Router();

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
       return res.status(400).json({mensaje: "email incorrecto"})
    }
    // Evaluamos la contraseña correcta
    if(!bcrypt.compareSync(body.pass, userDb.pass)){
        return res.status(400).json({mensaje: "contraseña incorrecta"})
    }
     // Pasó las validaciones
    return res.json({userDb, token:'jsjsjs'})
    } catch (error) {      
        return res.status(400).json({
        message: 'there is an err',
        error
    })

    }
})

module.exports = router;