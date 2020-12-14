
const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');
const user = require('../models/usersModel');
const pedirJalon = require ('../models/pedirJalonModel');
const jwt = require('jsonwebtoken');

router.post('/api/pedir-jalon',verifyToken, async (req, res) => {    
    try {
        const {email, Nombre, Apellido, Facultad, TipoVehiculo, Ruta, HoraSalida, TipoDestino, Descripcion}= req.body;
        let token = req.headers.authorization.split(' ')[1];
        if (User = await user.findOne({token})){
            if (Jalon = await pedirJalon.findOne ({"$expr":{"$and":[{"$eq":["$emailconductor",email]}, {"$eq":["$emailpasajero",User.email]}, {"$eq":["$horaSalida",HoraSalida]}, {"$eq":["$ruta",Ruta]}]}})){
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
                    user: 'jalonuniversitario@gmail.com',
                    pass: 'Password.1234'
                    }  
                });
                const mailOptions = {
                    from: 'noreply@jalonuniversitario.tk',
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

async function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauhtorized Request');
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauhtorized Request');
        }

        const payload = await jwt.verify(token, 'secretkey');
        if (!payload) {
            return res.status(401).send('Unauhtorized Request');
        }
        req.userId = payload._id;
        next();
    } catch(e) {
        console.log(e)
        return res.status(401).send('Unauhtorized Request');
    }
}

module.exports = router;