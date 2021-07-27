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
        req.user = decoded.data;
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
    veryfyPopularOffensiveWords();
}

module.exports= {verficationAuth, verifyAdministrator};

const verifyPopularOffensiveWords = async()=>{
    try {
      const ofensiveWords = await ofensiveWordsRepository.getAll();
      if(!ofensiveWords.lengh === 0){
          ofensiveWordsRepository.addOfOfensiveWord({word:'caca', level:5});
          ofensiveWordsRepository.addOfOfensiveWord({word:'pipi', level:3});
          ofensiveWordsRepository.addOfOfensiveWord({word:'culo', level:4});
          ofensiveWordsRepository.addOfOfensiveWord({word:'pedo', level:3});
          console.info('Popular offensive words success');
      }  
    } catch (error) {
        console.log(error);
    }
}