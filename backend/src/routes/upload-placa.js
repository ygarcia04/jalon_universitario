const { Router, json } = require('express');
const path = require('path');
const router = Router();
var multer = require("multer");
const drive = require('../models/driverModel');
const nodemailer = require('nodemailer');
const { encrypt } = require('./functions');
const jwt = require('jsonwebtoken');

var dirplaca='';
var email = '';
var codigo = '';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/drivers/placa')
    },
    filename: function(req, file, cb) {
        name=req.query.id + Date.now() + '.jpg';
        email = req.query.id
        dirplaca=name;
        cb(null, name)
    }
})



const placa = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 5MBs
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        //Success 
        cb(undefined, true)
    }
})




router.post('/api/upload-profile-placa', placa.single('file'), async(req, res) => {
      try {
        const Drive = await drive.findOne({email});
        const perfilPath = path.join(__dirname, "./upload/drivers/placa", Drive.picPlaca);

            email = Drive.email; 
            codigo = Drive.codigo;
            if(await drive.updateOne({email},{$set:{picPlaca:dirplaca}})){

            const emailHash = encrypt(email);
            const emailHash1=emailHash.iv;
            const emailHash2=emailHash.content;

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
                    subject: 'Registro Jalón Universitario',
                    html: "Gracias por unirse a Jalón Universitario<br> Para verificar su correo puede hacer click en el siguiente enlace:<br><br><a href='https://jalonuniversitario.tk/verification-link?user="+emailHash1+"&user1="+emailHash2+"&code="+codigo+"'><b>Click Aquí Para Verificar Tu Correo</b></a> <br><br> Si el enlace no funciona puede usar el siguiente codigo en la pantalla de verificacion: <br><br><b>" + codigo+"<br><br>Posteriormente se le informará sobre la activación de su cuenta por este mismo medio.</b></b>"
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return res.json({estado:'email'});
                    } else {
                        return res.status(200).json({estado:'hecho'});
                    }
                });
            /*FIN ENVIO DE CORREO*/  
                
            return res.json({estado:'Hecho'});
            }
        else{
            return res.json({estado:'Fallo'});
        } 

    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'})

    }
});


router.get('/api/profile-placa',verifyToken, async (req, res) => {
    try {
        correo=req.query.email
        const Drive = await drive.findOne({email:correo});
        const imageName = Drive.picPlaca; 
        const imagePath = path.join(__dirname, "../../upload/drivers/placa", imageName);
        res.sendFile(imagePath);  
    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'})
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