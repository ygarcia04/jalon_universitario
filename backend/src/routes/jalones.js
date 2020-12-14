const {Router}=require('express');
const router = Router();
const user = require('../models/usersModel');
const driver = require('../models/driverModel');
const pedirJalon = require ('../models/pedirJalonModel');
const ruta= require('../models/routesModel');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


router.get('/api/get-jalones-user-pendientes',verifyToken, async (req, res) => {
    
    try{
        let token = req.headers.authorization.split(' ')[1];
        const pasajero = await user.findOne({token});
        const email= pasajero.email;
        const usuario = await pedirJalon.find({ "$expr": { "$and":[{"$eq": [ "$emailpasajero", email]},{"$eq":["$estadoSolicitud","pendiente"]}]} }).sort({createdAt:-1});      
        const User = await pedirJalon.countDocuments({ "$expr": { "$and":[{"$eq": [ "$emailpasajero", email]},{"$eq":["$estadoSolicitud","pendiente"]}]} });      
        return res.json({usuario, User});
    }catch(error){
        console.log(error)
        res.json({estado:'Error'});
       
    }

});

router.get('/api/get-jalones-user-aceptados',verifyToken, async (req, res) => {
    
    try{
        let token = req.headers.authorization.split(' ')[1];
        const pasajero = await user.findOne({token})
        const email= pasajero.email;                                                          
        const usuario = await pedirJalon.find({ "$expr": { "$or":[{ "$and":[{"$eq": [ "$emailpasajero", email]},{"$eq":["$estadoSolicitud","aceptado"]}]},{ "$and":[{"$eq": [ "$emailpasajero", email]},{"$eq":["$estadoSolicitud","rechazado"]}]}]} }).sort({createdAt:-1});
        const User = await pedirJalon.countDocuments({ "$expr": { "$or":[{ "$and":[{"$eq": [ "$emailpasajero", email]},{"$eq":["$estadoSolicitud","aceptado"]}]},{ "$and":[{"$eq": [ "$emailpasajero", email]},{"$eq":["$estadoSolicitud","rechazado"]}]}]} });
    
        return res.json({usuario, User});
    }catch(error){
        console.log(error)
        res.json({estado:'Error'});
       
    }

});

router.get('/api/get-jalones-driver-pendientes',verifyToken, async (req, res) => {
    
    try{
        let token = req.headers.authorization.split(' ')[1];
        const conductor = await driver.findOne({token});
        const email= conductor.email;
        const usuario = await pedirJalon.find({ "$expr": { "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","pendiente"]}]} }).sort({createdAt:-1});
        
        const User = await pedirJalon.countDocuments({ "$expr": { "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","pendiente"]}]} });
        
        return res.json({usuario, User});
    }catch(error){
        console.log(error)
        res.json({estado:'Error'});
        
    }

});

router.get('/api/get-jalones-driver-aceptados',verifyToken, async (req, res) => {
    
    try{
        let token = req.headers.authorization.split(' ')[1];
        const pasajero = await driver.findOne({token})
        const email= pasajero.email;
                                                            
        const usuario = await pedirJalon.find({ "$expr": { "$or":[{ "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","aceptado"]}]},{ "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","rechazado"]}]}]} }).sort({createdAt:-1});
        const User = await pedirJalon.countDocuments({ "$expr": { "$or":[{ "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","aceptado"]}]},{ "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","rechazado"]}]}]} });
          
        return res.json({usuario, User});
    }catch(error){
        console.log(error)
        return res.status(401).send('Error'); 
        
    }

});

router.get('/api/get-count-jalones',verifyToken, async (req, res) => {
    
    try{
        let token = req.headers.authorization.split(' ')[1];
        const pasajero = await driver.findOne({token})
        const email= pasajero.email;
                                                            
        const Usuario = await pedirJalon.countDocuments({ "$expr": { "$and":[{"$eq": [ "$emailconductor", email]},{"$eq":["$estadoSolicitud","pendiente"]}]} });
        return res.json({Usuario});
    }catch(error){
        console.log(error)
        return res.status(401).send('Error'); 
        
    }

});



router.post('/api/aceptar-jalon',verifyToken, async (req, res) => {
    
    try{
        const {id}= req.body
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
        /*INICIO ENVIO DE CORREO PARA CONDUCTOR */
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'jalonuniversitario@gmail.com',
            pass: 'Password.1234'
            }  
        });
        const mailOptions = {
            from: 'noreply@jalonuniversitario.tk',
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
            from: 'noreply@jalonuniversitario.tk',
            to: correopasajero,
            subject: 'Petición de jalón aceptada',
            html: "El usuario "+conductor+" ha aceptado su petición de jalón<br><br>Si desea comunicarse con él/ella puede hacerlo a través del número de teléfono: <b>"+telefonoconductor+"</b>"
        };
        transporter.sendMail(mailOptions2, function(error, info){
            if (error) {
                return res.json({estado:'email'});
            } else {
                
                return res.status(200).json({estado:'hecho'});
            }
        });
    /*FIN ENVIO DE CORREO*/ 
        return res.json({estado:'hecho'});
    }catch(error){
        console.log(error)
        return res.status(401).send('Error');      
    }

});

router.post('/api/rechazar-jalon',verifyToken, async (req, res) => {
    
    try{
        const {id}= req.body       
        const jalon = await pedirJalon.findOne({_id:id});
        correopasajero = jalon.emailpasajero
        conductor=jalon.nombresconductor+' '+jalon.apellidosconductor;
        descripcion = jalon.descripcion;
        hora = jalon.horaSalida;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'jalonuniversitario@gmail.com',
            pass: 'Password.1234'
            }  
        });
        const mailOptions = {
            from: 'noreply@jalonuniversitario.tk',
            to: correopasajero,
            subject: 'Rechazo de jalón',
            html: "El usuario "+conductor+" a rechazado su petición de jalón para el punto de encuentro: "+descripcion+" a las "+hora+"</b>"
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
               console.log(error);
            }
        }); 
    await pedirJalon.updateOne({_id:id},{$set:{estadoSolicitud:'rechazado'}});
        return res.json({estado:'hecho'});
    }catch(error){
        console.log(error)
        return res.status(401).send('Error'); 
       
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