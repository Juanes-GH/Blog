import express from 'express';
const router = express.Router();

import user from '../models/user';

// Hash password
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

module.exports = router;