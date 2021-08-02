import express from 'express';
const router = express.Router();

import comments from '../models/comments';

//creat a commet
router.get("/new-comments", async(req, res)=>{
    const body = req.body;//es el cuerpo de una nota
    try {
        const commentDB = await comments.create(body);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Ocurre un error",
            error
        })
    }
})

router.delete("/comment/:id", async(req, res)=>{
    const _id = req.params.id;
    try {
        const commentDB = await comments.findByIdAndDelete({_id});
        if(!commentDB){
          return res.status(400).json({
            mensaje: 'No se encontró el id indicado',
            error
          })
        }
  
    } catch (error) {
        return res.status(500).json({
            mensaje: "Ocurre un error",
            error
        })

    }
})

router.put("/comment/:id", async(req, res)=>{
    const _id = req.params.id;
    const body = req.body;
    
    try {
        const commentDB = await comments.findByIdAndUpdate(_id, body, {new: true});
        res.json();
    } catch (error) {
        return res.status(400).json({
            mensaje: "err en update the note",
            err
        })
    }

})

module.exports = router;