const {Schema, model} = require('mongoose');
//const bcrypt = require ('bcrypt-nodejs');

const adminSchema = new Schema({
    nombres: String,
    apellidos: String,
    email: String,
    password : String,
    estado: String,
    token: String
}, {
    timestamps: true
});
adminSchema.index({email:1},{unique:true});

module.exports=model('admin', adminSchema);
