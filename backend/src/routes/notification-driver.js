const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');
const driver = require('../models/driverModel');
const jwt = require('jsonwebtoken');

router.post('/api/notification-driver-admin',verifyToken, async (req, res) => {
    try{
        const {email} = req.body;
        const Driver = await driver.findOne({email});
        if (!Driver) {return res.status(401).json({estado:'Driver'});
        }else {
            await driver.updateOne({email},{$set:{estado:"activo"}});
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
                subject: 'Cuenta activada',
                html: "Gracias por unirse a Jalón Universitario<br>  Su cuenta está activa, inicie sesión y disfrute del servicio que Jalon Universitario le ofrece"   
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return res.json({estado:'email'});
                } else {
                    return res.status(200).json({estado:'Hecho'});
                }
            });
            //Fin correo
        }
    }catch (error) {
        console.log(error);
        res.json({estado:'Error'});  
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