

const {Router}=require('express');
const router = Router();

const user = require('../models/usersModel');
const admin = require('../models/adminModels');
const driver = require('../models/driverModel');
const pedirJalon = require ('../models/pedirJalonModel');
const ruta= require('../models/routesModel');
const nodemailer = require('nodemailer');
const { findOne } = require('../models/usersModel');

router.get('/api/get-jalones-user-pendientes', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    try{
        const pasajero = await user.findOne({token});
        const email= pasajero.email;
        const usuario = await pedirJalon.find({ "$expr": { "$and":[{"$eq": [ "$emailpasajero", email]},{"$eq":["$estadoSolicitud","pendiente"]}]} }).sort({createdAt:-1});      
        const User = await pedirJalon.countDocuments({ "$expr": { "$and":[{"$eq": [ "$emailpasajero", email]},{"$eq":["$estadoSolicitud","pendiente"]}]} });      
        return res.json({usuario, User});
    }catch(error){
        console.log(error)
        res.json({estado:'Error'});
        console.log('error');
    }

});

router.get('/api/get-jalones-user-aceptados', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    try{
        const pasajero = await user.findOne({token})
        const email= pasajero.email;                                                          
        const usuario = await pedirJalon.find({ "$expr": { "$or":[{ "$and":[{"$eq": [ "$emailpasajero", email]},{"$eq":["$estadoSolicitud","aceptado"]}]},{ "$and":[{"$eq": [ "$emailpasajero", email]},{"$eq":["$estadoSolicitud","rechazado"]}]}]} }).sort({createdAt:-1});
        const User = await pedirJalon.countDocuments({ "$expr": { "$or":[{ "$and":[{"$eq": [ "$emailpasajero", email]},{"$eq":["$estadoSolicitud","aceptado"]}]},{ "$and":[{"$eq": [ "$emailpasajero", email]},{"$eq":["$estadoSolicitud","rechazado"]}]}]} });
        console.log(usuario);
        return res.json({usuario, User});
    }catch(error){
        console.log(error)
        res.json({estado:'Error'});
        console.log('error');
    }

});

router.get('/api/get-jalones-driver-pendientes', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    try{
        const conductor = await driver.findOne({token});
        const email= conductor.email;
        const usuario = await pedirJalon.find({ "$expr": { "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","pendiente"]}]} }).sort({createdAt:-1});
        
        const User = await pedirJalon.countDocuments({ "$expr": { "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","pendiente"]}]} });
        
        return res.json({usuario, User});
    }catch(error){
        console.log(error)
        res.json({estado:'Error'});
        console.log('error');
    }

});

router.get('/api/get-jalones-driver-aceptados', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    try{
        const pasajero = await driver.findOne({token})
        const email= pasajero.email;
                                                            
        const usuario = await pedirJalon.find({ "$expr": { "$or":[{ "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","aceptado"]}]},{ "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","rechazado"]}]}]} }).sort({createdAt:-1});
        const User = await pedirJalon.countDocuments({ "$expr": { "$or":[{ "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","aceptado"]}]},{ "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","rechazado"]}]}]} });
          
        return res.json({usuario, User});
    }catch(error){
        console.log(error)
        res.json({estado:'Error'});
        console.log('error');
    }

});

router.get('/api/get-count-jalones', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    try{
        const pasajero = await driver.findOne({token})
        const email= pasajero.email;
                                                            
        const Usuario = await pedirJalon.countDocuments({ "$expr": { "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","pendiente"]}]} });
        console.log(Usuario);
        return res.json({Usuario});
    }catch(error){
        console.log(error)
        res.json({estado:'Error'});
        console.log('error');
    }

});



router.post('/api/aceptar-jalon', async (req, res) => {
    
    try{
        const {id}= req.body
        console.log(req.body);
        const jalon = await pedirJalon.findOne({_id:id});
       
        pasajero=jalon.nombrespasajero+' '+jalon.apellidospasajero;
        conductor=jalon.nombresconductor+' '+jalon.apellidosconductor;
        correopasajero=jalon.emailpasajero;
        correoconductor=jalon.emailconductor;
        Driver= await driver.findOne({email:correoconductor});
        User = await user.findOne({email:correopasajero});
        Ruta= await ruta.findOne ({"$expr":{"$and":[{"$eq":["$email",correoconductor]}, {"$eq":["$horaSalida",jalon.horaSalida]}, {"$eq":["$tipoDestino",jalon.tipoDestino]}, {"$eq":["$ruta",jalon.ruta]}]}});
        Asientos=Ruta.asientos;
        idr=Ruta._id;
        await ruta.updateOne({_id:idr},{$set:{asientos:Asientos-1}}) 
        telefonoconductor=Driver.telefono
        telefonopasajero=User.telefono
        console.log(telefonoconductor);
        
        /*INICIO ENVIO DE CORREO PARA CONDUCTOR */
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'correop726@gmail.com',
            pass: 'Password.1234'
            }  
        });
        const mailOptions = {
            from: 'correop726@gmail.com',
            to: correoconductor,
            subject: 'Aceptación de jalón',
            html: "Ha aceptado dar jalon a: "+pasajero+"<br><br>Si desea comunicarse con él/ella puede hacerlo a través del número de teléfono: <b>"+telefonopasajero+"</b>"
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.json({estado:'email'});
            }
        });

        await pedirJalon.updateOne({_id:id},{$set:{estadoSolicitud:'aceptado'}});
        const mailOptions2 = {
            from: 'correop726@gmail.com',
            to: correopasajero,
            subject: 'Petición de jalón aceptada',
            html: "El usuario "+conductor+" ha aceptado su petición de jalón<br><br>Si desea comunicarse con él/ella puede hacerlo a través del número de teléfono: <b>"+telefonoconductor+"</b>"
        };
        transporter.sendMail(mailOptions2, function(error, info){
            if (error) {
                return res.json({estado:'email'});
            } else {
                
                return res.status(200).json({estado:'hecho', token});
            }
        });
    /*FIN ENVIO DE CORREO*/ 

        return res.json({estado:'hecho'});
    }catch(error){
        console.log(error)
        res.json({estado:'Error'});
        console.log('error');
    }

});

router.post('/api/rechazar-jalon', async (req, res) => {
    
    try{
        const {id}= req.body
        console.log(req.body);
        const jalon = await pedirJalon.find({id});
        await pedirJalon.updateOne({_id:id},{$set:{estadoSolicitud:'rechazado'}});
        correopasajero = jalon.emailpasajero
        conductor=jalon.nombresconductor+' '+jalon.apellidosconductor;
        rutaConductor = jalon.ruta;
        hora = jalon.horaSalida;

         /*INICIO ENVIO DE CORREO PARA CONDUCTOR */
         /*const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'correop726@gmail.com',
            pass: 'Password.1234'
            }  
        });
        const mailOptions3 = {
            from: 'correop726@gmail.com',
            to: correopasajero,
            subject: 'Rechazo de jalón',
            html: "El usuario "+conductor+" a rechazado su petición de jalón para la ruta "+rutaConductor+" a las "+hora+"</b>"
        };
        transporter.sendMail(mailOptions3, function(error, info){
            if (error) {
                return res.json({estado:'email'});
            } else {
                
                return res.status(200).json({estado:'hecho', token});
            }
        });*/
    /*FIN ENVIO DE CORREO*/ 
        return res.json({estado:'hecho'});

    }catch(error){
        console.log(error)
        res.json({estado:'Error'});
        console.log('error');
    }

});



module.exports = router;