import express from 'express';
const router = express.Router();
// import nota model
import Nota from '../models/nota';
//add a Note
router.post("/nueva-nota", async(req, res)=>{
    const body = req.body;//es el cuerpo de una nota

    try {
        const notaDB = await Nota.create(body);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Ocurre un error",
            error
        })
    }
});

//get con params
router.get('/nota/:id', async(req, res) => {
    const _id = req.params.id;
    try {
      const notaDB = await Nota.findOne({_id});
      res.json(notaDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });
// get all the notes
  router.get("/notas", async(req, res)=>{
      try {
        const notaDb = await Nota.find();
        res.json(notaDb); 
      } catch (error) {
          return res.status(400).json({
              mensaje: 'Ha ocirrido un error',
              error
          })
      }
  })
// delete a note
  router.delete("/nota/:id", async(req, res)=>{
      const _id = req.params.id;
    try {
      const notaDb = await Nota.findByIdAndDelete({_id});
      if(!notaDb){
        return res.status(400).json({
          mensaje: 'No se encontró el id indicado',
          error
        })
      }
      res.json(notaDb); 
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ha ocirrido un error',
            error
        })
    }
})

//update de note

router.put("/nota/:id", async(req, res)=>{
    const _id = req.params.id;
    const body = req.body;
    
    try {
        const notaDb = await Nota.findByIdAndUpdate(_id, body, {new: true});
        res.json();
    } catch (error) {
        return res.status(400).json({
            mensaje: "err en update the note",
            err
        })
    }
})

module.exports = router;