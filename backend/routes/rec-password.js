const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');
const user = require('../modules/usersModel');
//const bcrypt = require ('bcrypt-nodejs');

router.post('/api/rec-password', async (req, res)=>{
    try {
    //guardar los valores de los datos recibidos en formato json
    const {email}= req.body;
    //Creando el objeto usuario usando el modelo en users.js
    const email_l =email.toLowerCase();

    //equivale a escribir new user({email:email, password:password         
          /*VERIFICANDO SI EXISTE YA UN CORREO EN LA BASE*/
          if(UserR = await user.findOne({email:email_l})) {     
            var crypto= require('crypto');
            var tempPassword= crypto.randomBytes(10).toString('hex');
            /*Encriptacion y desencripcion de contraseñas
            const salt = bcrypt.genSaltSync();
            const hash= bcrypt.hashSync(tempPassword, salt);
            await user.updateOne({email:email_l},{$set:{temporal_pass:hash}});
            await driver.updateOne({email:email_l},{$set:{temporal_pass:hash}});*/
            
            /*INICIO ENVIO DE CORREO */
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'paratus.unah@gmail.com',
                pass: '3-4N}%b*H^'
                }  
            });
            const mailOptions = {
                from: 'paratus.unah@gmail.com',
                to: email_l,
                subject: 'Contraseña temporal Paratus',
                html: "Ha solicitado una contraseña temporal, usela para entrar y cambiar su contraseña <br><br><br> <b>Contraseña:<b><br><b>" + tempPassword+"<b><br><br><br>"
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return res.json({estado:'noEnviado'});
                } else {
                    res.status(200).json({estado:'hecho'});
                }
            });
        /*FIN ENVIO DE CORREO*/ 

                     
          } else {
            return res.json({estado:'Nocorreo'});
                    
          }
    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'});
        
    }
       
    });

    
module.exports = router;