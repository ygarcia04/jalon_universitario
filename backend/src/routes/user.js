
const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');

const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');

router.get('/', (req, res)=> res.send('Hello-World'));

//La funcion debe ser async para poder usar await
router.post('/signup', async (req, res)=>{
    //guardar los valores de los datos recibidos en formato json
    const { nombres, apellidos, email, password, vpassword, numeroCuenta, direccion, facultad, fechaNacimiento, telefono, sexo}= req.body;
    //Creando el objeto usuario usando el modelo en users.js
    if (password != vpassword){
        return res.json({estado:'password'})
    }
    const email_l =email.toLowerCase();
    

    /*REvisar si cumple con @unah.hn*/
    //var reg = /\*(@unah.hn)/;
    if(email_l.match(/@unah.hn$/)){
        
    
    //equivale a escribir new user({email:email, password:password})
 
        //creando codigo de validacion
        function getRandomInt(min, max) {
            result = Math.floor(Math.random() * (max - min)) + min;
            return result;
          }
          
          /*VERIFICANDO SI EXISTE YA UN CORREO EN LA BASE*/
          if( UserR = await user.findOne({email:email_l})) {
                return res.json({estado: 'correo_repetido'});     
          } else {
            var codigo = getRandomInt(1,10000);
            var codigoS = codigo.toString().padStart(5,'0');
            while(CodigoV=await user.findOne({codigo:codigoS})){
                codigo=getRandomInt(1,10000);
                codigoS = codigo.toString().padStart(5,'0');
            }
            const salt = bcrypt.genSaltSync();
            const hash= bcrypt.hashSync(password, salt);
            /*GUARDADO EN LA BASE*/
            const newUser = new user ({nombres, apellidos, email:email_l, password:hash,numeroCuenta, codigo:codigoS, estado:"inactivo", direccion, facultad, fechaNacimiento, telefono, sexo, token:"", temporal_pass:""});
            await newUser.save();
            const token = await jwt.sign({_id: newUser._id}, 'secretkey');
            await user.updateOne({email:email_l},{$set:{token:token}});
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
                    subject: 'Codigo de Verificación Jalón Universitario',
                    html: "Hola, su código de verificación es: <br><br>" + codigoS
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

    router.post('/verification', verifyToken, async (req, res) => {
        const { codigo } = req.body;
        let token = req.headers.authorization.split(' ')[1]
        try {   
            const User = await user.findOne({token});
            console.log(User);
            if(codigo==User.codigo){
                email = User.email; 
                await user.updateOne({email},{$set:{estado:"activo",codigo:""}});
                res.json({estado:'Hecho', token});
            }else{
                res.json({estado:'Fallo', token});
            }       
        } catch (error) {
            console.log('Error en el sistema');
            res.json({estado:'Sistema', token});
        }
    });
    
    router.get('/profile',verifyToken, async (req, res) => {
        let token_l = req.headers.authorization.split(' ')[1];
        try {
            const User= await user.findOne({token:token_l});
            return res.json({User});
        } catch (error) {
            res.json({estado:'error', token_l});
            
        }
        
    });

    router.get('/user-state', async (req, res) => {
        let token_l = req.headers.authorization.split(' ')[1];
        try {
            const User= await user.findOne({token:token_l});
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