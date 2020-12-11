const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');
const { encrypt, decrypt } = require('./functions');

const driver = require('../models/driverModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');
const driverModel = require('../models/driverModel');

router.post('/api/notification-driver-admin', async (req, res) => {
    try{
        const {email} = req.body;
        console.log(email + 'hecho');
        const Driver = await driver.findOne({email});
    
        if (!Driver) {return res.status(401).json({estado:'Driver'});
        }else {
            await driver.updateOne({email},{$set:{estado:"activo"}});
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
        res.json({estado:'Sistema'});
    }
});

module.exports = router;