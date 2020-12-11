
const {Router}=require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const user = require('../models/usersModel');
const pedirJalon = require ('../models/pedirJalonModel');
const { findOne } = require('../models/usersModel');
var prueba = ''

router.post('/api/pedir-jalon', async (req, res) => {
    const {email, Nombre, Apellido, Facultad, TipoVehiculo, Ruta, HoraSalida, TipoDestino, Descripcion}= req.body;
    let token = req.headers.authorization.split(' ')[1];
    
    try {
        if (User = await user.findOne({token})){
            if (Jalon = await pedirJalon.findOne ({"$expr":{"$and":[{"$eq":["$emailconductor",email]}, {"$eq":["$emailpasajero",User.email]}, {"$eq":["$horaSalida",HoraSalida]}, {"$eq":["$ruta",Ruta]}]}})){
                console.log (HoraSalida);
                return res.json({estado:'repetido'});
            }else{
                const newUser = new pedirJalon ({nombresconductor:Nombre, apellidosconductor:Apellido, emailconductor:email, 
                    facultadconductor:Facultad, tipoVehiculo:TipoVehiculo, horaSalida:HoraSalida, ruta:Ruta,
                    tipoDestino:TipoDestino, nombrespasajero:User.nombres, apellidospasajero:User.apellidos, 
                    emailpasajero:User.email,descripcion:Descripcion, facultadpasajero:User.facultad, estadoSolicitud:"pendiente"});
                await newUser.save(); 

                 /*INICIO ENVIO DE CORREO */
                 const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                    user: 'correop726@gmail.com',
                    pass: 'Password.1234'
                    }  
                });
                const mailOptions = {
                    from: 'correop726@gmail.com',
                    to: email,
                    subject: 'Petición de asiento Jalón Universitario',
                    html: "Usted ha recibido una solicitud de asiento para su viaje del día de hoy a las "+HoraSalida+"<br><br> Favor ingrese a la aplicación y brinde contestación a la solicitud<br></b>"
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return res.json({estado:'email'});
                    } else {
                        return res.status(200).json({estado:'Hecho', token});
                    }
                });
            /*FIN ENVIO DE CORREO*/  
    
                return res.status(200).json({estado:'hecho'});
            }
        }else{
                return res.json({estado:'noprocesado'});
        }
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'});
    }

});


module.exports = router;