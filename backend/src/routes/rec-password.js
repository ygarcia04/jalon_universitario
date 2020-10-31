const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');

const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');

router.post('/rec-password', async (req, res)=>{
    //guardar los valores de los datos recibidos en formato json
    const { email}= req.body;
    //Creando el objeto usuario usando el modelo en users.js
    const email_l =email.toLowerCase();
    

    /*REvisar si cumple con @unah.hn*/
    //var reg = /\*(@unah.hn)/;
    if(email_l.match(/@unah.hn$/)){
        
    
    //equivale a escribir new user({email:email, password:password
          
          /*VERIFICANDO SI EXISTE YA UN CORREO EN LA BASE*/
          if( UserR = await user.findOne({email:email_l})) {
            if(UserR.estado=='inactivo'){
                return res.json({estado:'inactivo'});
            }
        
            var crypto= require('crypto');
            var tempPassword= crypto.randomBytes(10).toString('hex');
            console.log(tempPassword);
            const salt = bcrypt.genSaltSync();
            const hash= bcrypt.hashSync(tempPassword, salt);
            await user.updateOne({email:email_l},{$set:{temporal_pass:hash}});
            
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
                to: email_l,
                subject: 'Contraseña temporal Jalón Universitario',
                html: "Ha solicitado una contraseña temporal, usela para entrar y cambiar su contraseña <br><br><br> <b>Contraseña:<b><br><b>" + tempPassword+"<b><br><br><br>"
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return res.json({estado:'noEnvado'});
                } else {
                    res.status(200).json({estado:'hecho'});
                }
            });
        /*FIN ENVIO DE CORREO*/ 

                     
          } else {
            return res.json({estado:'Nocorreo'});
                    
          }
    
        }else{
            res.json({estado:'correo'});
            console.log('Su correo no es de la UNAH');
        }    
    });

    
module.exports = router;