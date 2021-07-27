import express from 'express';
const router = express.Router();

import user from '../models/user';
const {verficationAuth, verifyAdministrator}= require('../middlewares/autentificacion')

// Hash password
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Filtrar campos de PUT
const _ = require('underscore');

// post 
router.post("/new-user", async(req, res)=>{
    const body = {
        name: req.body.name,
        email: req.body.email,
        rol: req.body.rol
    };
    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

    try {
        const userDb = await user.create(body);
        res.json(userDb)
    } catch (error) {
        return res.status(500).json({
            message: 'there is an err',
            error
        })
    }
})
//Delete users
router.delete('/user/:id', async(req, res)=>{
    const _id = req.params.id;
    try {
        const userDb = await user.findByIdAndDelete({_id});
        if(!userDb){
            return res.status(400).json({
              mensaje: 'No se encontró el id indicado',
              error
            })
          }
    
    } catch (error) {
        return res.status(500).json({
            message: "Ha ocirrido un error",
            error
        })
    }
})
//put users
router.put('/user/:id',[verficationAuth, verifyAdministrator], async(req, res)=>{

    const _id = req.params.id;
    const body = _.pick(req.body, ['name', 'email', 'pass', 'activo']);
    if(body.pass){
        body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
    }
    try {
        // {new:true} nos devuelve el usuario actualizado en postman{runValidators: true} para que no se coloque roles invalidos
        const userDb= await user.findByIdAndUpdate(_id, body, {new: true, runValidators: true})
        return res.json(userDb)
        
    } catch (error) {
        return res.status(500).json({
            message: 'there is an err',
            error
        })
    }
})

module.exports = router;