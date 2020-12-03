const {Router}=require('express');
const router = Router();
const path = require('path');
const nodemailer = require('nodemailer');
const drive = require('../models/driveModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');
const { encrypt, decrypt } = require('./functions');


router.get('/api/', (req, res)=> res.send('Hello-World'));

//La funcion debe ser async para poder usar await
router.post('/signupd', async (req, res)=>{
    //guardar los valores de los datos recibidos en formato json
    const {nombres, apellidos, email, password, vpassword, numeroCuenta,
        identidad, direccion, facultad, fechaNacimiento, telefono, sexo,
        /*intentos:Number,
        token: String,
        temporal_pass:String,
        mesRegistro:Number,
        anioRegistro:Number,*/
        marca, modelo,
        tipo, color, motor, anio}= req.body;

    //Creando el objeto usuario usando el modelo en drive.js
    if (password != vpassword){
        return res.json({estado:'password'})
    }
    const email_l =email.toLowerCase();
    

    /*Revisar si cumple con @unah.hn*/
    //var reg = /\*(@unah.hn)/;
    if(email_l.match(/@unah.hn$/)){
        
    
    //equivale a escribir new user({email:email, password:password})
 
        //creando codigo de validacion
        function getRandomInt(min, max) {
            result = Math.floor(Math.random() * (max - min)) + min;
            return result;
          }
          
          /*VERIFICANDO SI EXISTE YA UN CORREO EN LA BASE*/
          if( DriveR = await drive.findOne({email:email_l})) {
                return res.json({estado: 'correo_repetido'});     
          } else {
            var codigo = getRandomInt(1,10000);
            var codigoS = codigo.toString().padStart(5,'0');
            while(CodigoV=await drive.findOne({codigo:codigoS})){
                codigo=getRandomInt(1,10000);
                codigoS = codigo.toString().padStart(5,'0');
            }
            const salt = bcrypt.genSaltSync();
            const hash= bcrypt.hashSync(password, salt);
            /*GUARDADO EN LA BASE*/
            const imageName ="Default.png";
           mesRegistro=new Date().getMonth();
           anioRegistro=new Date().getFullYear();
            const newUser = new drive ({nombres, apellidos, email:email_l, password:hash, numeroCuenta, identidad,
                codigo:codigoS, estado:"inactivo", direccion, facultad, fechaNacimiento, telefono, sexo, 
                picPerfil:imageName, intentos:0, marca, modelo, tipo, color, motor, anio, placa: '', picLicencia: "", 
                picRevision: "", picPlaca:"", token:"", temporal_pass:"",anioRegistro,mesRegistro});
            await newUser.save();
            const token = await jwt.sign({_id: newUser._id}, 'secretkey');
            await drive.updateOne({email:email_l},{$set:{token:token}});
            const emailHash = encrypt(email_l);
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
                    to: email_l,
                    subject: 'Registro Jalón Universitario',
                    html: "Gracias por unirse a Jalón Universitario<br> Posteriormente se le informará sobre la activación de su cuenta por este mismo medio </b>"
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return res.json({estado:'email'});
                    } else {
                        res.status(200).json({token});
                    }
                });
            /*FIN ENVIO DE CORREO*/         
          }
    
        }else{
            res.json({estado:'correo'});
            console.log('Su correo no es de la UNAH');
        }    
    });

    
    router.get('/api/profile',verifyToken, async (req, res) => {
        let token_l = req.headers.authorization.split(' ')[1];
        try {
            const User= await drive.findOne({token:token_l});
            return res.json({User});
        } catch (error) {
            res.json({estado:'error', token_l});
            
        }
        
    });

    router.get('/api/user-state', async (req, res) => {
        let token_l = req.headers.authorization.split(' ')[1];
        try {
            const User= await drive.findOne({token:token_l});
            if(User.estado=='inactivo'){
                return res.json({estado:'inactivo'});
            }else{
                return res.json({estado:'activo'})
            }
        } catch (error) {
            res.json({estado:'error'});
            
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
            //console.log(e)
            return res.status(401).send('Unauhtorized Request');
        }
    }

module.exports = router;