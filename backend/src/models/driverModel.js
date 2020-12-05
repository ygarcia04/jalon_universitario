const {Schema, model} = require('mongoose');

const driverSchema = new Schema({
    nombres: String,
    apellidos: String,
    email: String,
    password : String,
    numeroCuenta: String,
    identidad: String,
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
    anioRegistro:Number,
    //Datos vehiculo
    marca: String,
    modelo: String,
    tipo: String,
    color: String,
    motor: String,
    anio: String,
    placa: String,
    picLicencia: String,
    picRevision: String,
    picPlaca: String
}, {
    timestamps: true
});
driverSchema.index({email:1},{unique:true});

module.exports=model('driver', driverSchema);
