const {Schema, model} = require('mongoose');
const bcrypt = require ('bcrypt-nodejs');

const userSchema = new Schema({
    nombres: String,
    apellidos: String,
    email : String,
    password : String,
    numeroCuenta: String,
    codigo: String,
    estado: String,
    direccion: String,
    facultad: String,
    fechaNacimiento: Date,
    picPerfil: String,
    telefono: String,
    sexo: String,
    intentos:Number,
    token: String,
    temporal_pass:String,
    mesRegistro:Number,
    anioRegistro:Number
}, {
    timestamps: true
});
userSchema.index({email:1},{unique:true});

//Encriptacion de la contraseña haciendo uso de bcrypt
/*userSchema.pre ('save', function(next){
    const usuario = this;
    if (!usuario.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt)=>{
        if (err){
            next (err);
        }
        bcrypt.hash(usuario.password, salt, null, (err, hash)=>{
            if (err){
                next (err);
            }
            usuario.password = hash;
            next();
        })
    })
})*/




//Lectura de contraseñas encriptadas
userSchema.methods.compararPass = function (password, cb){ //cb = callback
    bcrypt.compare(password, this.password, (err, iguales)=>{
        if (err){
            return cb(err);
        }
        cb (null, iguales);
    })
}

module.exports=model('user', userSchema);