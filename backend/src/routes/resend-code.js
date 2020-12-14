
const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');
const { encrypt } = require('./functions');
const user = require('../models/usersModel');
const driver = require ('../models/driverModel');
const jwt = require('jsonwebtoken');

router.get('/api/resend-code',verifyToken, async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    if (User = await user.findOne({token})){
        try {
            let token = req.headers.authorization.split(' ')[1];
            const User = await user.findOne({token});
            const email_l= User.email;
            const codigoS=User.codigo;
            const emailHash = encrypt(email_l);
            const emailHash1=emailHash.iv;
            const emailHash2=emailHash.content;
            //Correo
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'jalonuniversitario@gmail.com',
                pass: 'Password.1234'
                }  
            });
            const mailOptions = {
                from: 'noreply@jalonuniversitario.tk',
                to: email_l,
                subject: 'Reenvio Codigo de Verificación Jalón Universitario',
                html: "Gracias por unirse a Jalón Universitario<br> Para activar su cuenta puede hacer click en el siguiente enlace:<br><br><a href='https://jalonuniversitario.tk/verification-link?user="+emailHash1+"&user1="+emailHash2+"&code="+codigoS+"'><b>Click Aquí Para Activar Tu Cuenta</b></a> <br><br> Si el enlace no funciona puede usar el siguiente codigo en la pantalla de verificacion: <br><br><b>" + codigoS+"</b>"
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return res.json({estado:'email'});
                } else {
                    return res.status(200).json({estado:'Hecho'});
                }
            });
            //Fin correo
        } catch (error) {
            return res.status(401).json({estado:'Error'});
        }
    }
    if (User = await driver.findOne({token})){
        try {
            let token = req.headers.authorization.split(' ')[1];
            const User = await driver.findOne({token});
            const email_l= User.email;
            const codigoS=User.codigo;
            const emailHash = encrypt(email_l);
            const emailHash1=emailHash.iv;
            const emailHash2=emailHash.content;
            //Correo
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'jalonuniversitario@gmail.com',
                pass: 'Password.1234'
                }  
            });
            const mailOptions = {
                from: 'noreply@jalonuniversitario.tk',
                to: email_l,
                subject: 'Reenvio Codigo de Verificación Jalón Universitario',
                html: "Gracias por unirse a Jalón Universitario<br> Para verificar su correo puede hacer click en el siguiente enlace:<br><br><a href='https://jalonuniversitario.tk/verification-link?user="+emailHash1+"&user1="+emailHash2+"&code="+codigoS+"'><b>Click Aquí Para Verificar Tu Correo</b></a> <br><br> Si el enlace no funciona puede usar el siguiente codigo en la pantalla de verificacion: <br><br><b>" + codigoS+"</b>"
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return res.json({estado:'email'});
                } else {
                    return res.status(200).json({estado:'Hecho'});
                }
            });
            //Fin correo
        } catch (error) {
            console.log(error)
            return res.status(401).json({estado:'Error'});
        }
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