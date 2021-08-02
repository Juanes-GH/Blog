import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schemaComments = new Schema({
    comment: String,
    usuarioId: String,
})

// Convertir a modelo
const comments = mongoose.model('comments', schemaComments);

export default comments;