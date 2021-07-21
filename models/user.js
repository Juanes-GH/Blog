import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');// L-cifra constraseña

const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} no es un rol válido'
}
const userSchema = new Schema({
    name:   { type: String, required: [true, 'the name is required'] },
    email: { type: String, unique: true, required: [true, 'the email is required'] },
    pass: { type: String, required: [true, 'the passwprd is required'] },
    date: { type: Date, default: Date.now },
    rol: { type: String, default: 'USER', enum: roles },
    activo: { type: Boolean, default: true }
});

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

// Eliminar pass de respuesta JSON
userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.pass;
    return obj;
}

const user = mongoose.model('user', userSchema);

export default user;