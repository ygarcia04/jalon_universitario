const {Schema, model} = require('mongoose');

const routeSchema = new Schema({
    nombres: String,
    apellidos: String,
    facultad: String,
    tipoVehiculo: String,
    email: String,
    horaSalida: String,
    tipoDestino: String, //Hacia o desde la universidad
    ruta: String,
    telefonoConductor:String,
    asientos: Number
}, {
    timestamps: true
});

module.exports=model('route', routeSchema);