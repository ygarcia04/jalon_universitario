const {Schema, model} = require('mongoose');

const pedirJalonSchema = new Schema({
    nombresconductor: String,
    apellidosconductor: String,
    facultadconductor: String,
    tipoVehiculo: String,
    emailconductor: String,
    horaSalida: String,
    tipoDestino: String, //Hacia o desde la universidad
    ruta: String,
    nombrespasajero: String,
    apellidospasajero: String,
    facultadpasajero: String,
    emailpasajero: String,
    descripcion:String,
    estadoSolicitud: String     //pendiente, aceptada, rechazada
}, {
    timestamps: true
});

module.exports=model('pedirJalon', pedirJalonSchema);