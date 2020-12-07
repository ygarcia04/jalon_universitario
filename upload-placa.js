const { Router, json } = require('express');
const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();
var multer = require("multer");
const drive = require('../models/driverModel');
const nodemailer = require('nodemailer');
const { encrypt, decrypt } = require('./functions');

var dirplaca='';
var email = '';
var codigo = '';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/drivers/placa')
    },
    filename: function(req, file, cb) {
        //console.log (req.query.id)
        name=req.query.id + Date.now() + '.jpg';
        email = req.query.id
        dirplaca=name;
        cb(null, name)
    }
})



const placa = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        //Success 
        cb(undefined, true)
    }
})




router.post('/upload-profile-placa', placa.single('file'), async(req, res) => {

    try {
        console.log('Esto es placas');
        //const image = new Image();

        // the file is uploaded when this route is called with formdata.

        // now you can store the file name in the db if you want for further reference.
        const Drive = await drive.findOne({email});
        const perfilPath = path.join(__dirname, "../../upload/drivers/placa", Drive.picPlaca);
            //console.log (perfilPath)
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
                    user: 'correop726@gmail.com',
                    pass: 'Password.1234'
                    }  
                });
                const mailOptions = {
                    from: 'correop726@gmail.com',
                    to: email,
                    subject: 'Registro Jalón Universitario',
                    html: "Gracias por unirse a Jalón Universitario<br> Para verificar su correo puede hacer click en el siguiente enlace:<br><br><a href='https://jalonuniversitario.tk/verification-link?user="+emailHash1+"&user1="+emailHash2+"&code="+codigo+"'><b>Click Aquí Para Verificar Tu Correo</b></a> <br><br> Si el enlace no funciona puede usar el siguiente codigo en la pantalla de verificacion: <br><br><b>" + codigo+"<br><br>Posteriormente se le informará sobre la activación de su cuenta por este mismo medio.</b></b>"
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return res.json({estado:'email'});
                    } else {
                        return res.status(200).json({estado:'hecho', token});
                    }
                });
            /*FIN ENVIO DE CORREO*/  
                
            return res.json({estado:'Hecho'});
            }
        else{
            return res.json({estado:'Fallo'});
        } 

    } catch (error) {
        console.log(error);
        return res.json({ estado: 'error' });

    }


});


router.get('/profile-placa', async (req, res) => {


     //let token = req.headers.authorization.split(' ')[1];
        const Drive = await drive.findOne({email});
        if(Drive.estado=='inactivo'){
            return res.json({estado:'inactivo'});
        }

    const imageName = Drive.picPlaca; 
    console.log(imageName);
    const imagePath = path.join(__dirname, "../../upload/drivers/placa", imageName);
    console.log(imagePath);

    res.sendFile(imagePath);


});



module.exports = router;