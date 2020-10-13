const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    nombres: String,
    apellidos: String,
    email : String,
    password : String,
    numeroCuenta: String,
    codigo: String,
    estado: String,
    direccion: String 
}, {
    timestamps: true
});
userSchema.index({email:1},{unique:true});
module.exports=model('user', userSchema);