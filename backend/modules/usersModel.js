const {Schema, model} = require('mongoose');
const bcrypt = require ('bcrypt-nodejs');

const userSchema = new Schema({
    nombres: String,
    apellidos: String,
    
    email: String,
    password: String,
    direccion: String,
    fechaNacimiento: Date,
    picPerfil: String,
    telefono: String,
    sexo: String,
    //intentos:Number,
    //token: String,
    temporal_pass:String,
    mesRegistro:Number,
    anioRegistro:Number
}, {
    timestamps: true
});
userSchema.index({email:1},{unique:true});

//Lectura de contraseñas encriptadas
/*userSchema.methods.compararPass = function (password, cb){ //cb = callback
    bcrypt.compare(password, this.password, (err, iguales)=>{
        if (err){
            return cb(err);
        }
        cb (null, iguales);
    })
}*/


module.exports=model('user', userSchema);