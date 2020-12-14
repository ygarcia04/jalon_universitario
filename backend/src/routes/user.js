
const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');
const user = require('../models/usersModel');
const driver = require('../models/driverModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');
const { encrypt } = require('./functions');

//La funcion debe ser async para poder usar await
router.post('/api/signup', async (req, res)=>{
    try {
        //guardar los valores de los datos recibidos en formato json
        const { nombres, apellidos, email, password, vpassword, numeroCuenta, direccion, facultad, fechaNacimiento, telefono, sexo}= req.body;
        //Creando el objeto usuario usando el modelo en users.js
        if (password != vpassword){
            return res.json({estado:'password'})
        }
        const email_l =email.toLowerCase();
        /*REvisar si cumple con @unah.hn*/
        if(email_l.match(/@unah.hn$/)){ 
    
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
                const imageName ="Default.png";
                //const imagePath = path.join(__dirname, "../../upload", imageName);
                mesRegistro=new Date().getMonth();
                anioRegistro=new Date().getFullYear();
                const newUser = new user ({nombres, apellidos, email:email_l, password:hash,numeroCuenta, codigo:codigoS, estado:"inactivo", direccion, facultad, fechaNacimiento, telefono, sexo, picPerfil:imageName, intentos:0, token:"", temporal_pass:"",anioRegistro,mesRegistro});
                await newUser.save();
                const token = await jwt.sign({_id: newUser._id}, 'secretkey');
                await user.updateOne({email:email_l},{$set:{token:token}});
                const emailHash = encrypt(email_l);
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
                    to: email_l,
                    subject: 'Codigo de Verificación Jalón Universitario',
                    html: "Gracias por unirse a Jalón Universitario<br> Para activar su cuenta puede hacer click en el siguiente enlace:<br><br><a href='https://jalonuniversitario.tk/verification-link?user="+emailHash1+"&user1="+emailHash2+"&code="+codigoS+"'><b>Click Aquí Para Activar Tu Cuenta</b></a> <br><br> Si el enlace no funciona puede usar el siguiente codigo en la pantalla de verificacion: <br><br><b>" + codigoS+"</b>"
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return res.json({estado:'email'});
                    } else {
                        return res.status(200).json({estado:'hecho', token});
                    }
                });
                /*FIN ENVIO DE CORREO*/         
            }

        }else{
            res.json({estado:'correo'});
            console.log('Su correo no es de la UNAH');
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'}) 
    }
        
});

    
router.get('/api/profile',verifyToken, async (req, res) => {
    
    try {
        let token_l = req.headers.authorization.split(' ')[1];
        if(Driver= await driver.findOne({token:token_l})){
            console.log(Driver);
            return res.json({Driver});
        }
        if(User= await user.findOne({token:token_l}, {_id:0})){
            console.log(User);
            return res.json({User});
        }        
    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'})    
    }
});

router.get('/api/user-state',verifyToken, async (req, res) => { 
    try {
        let token_l = req.headers.authorization.split(' ')[1];
        if(User= await user.findOne({token:token_l})){
            if(User.estado=='inactivo'){
                return res.json({estado:'inactivo'});
            }else{
                return res.json({estado:'activo'})
            }
        }
        if(Driver= await driver.findOne({token:token_l})){
            console.log(Driver);
            if(Driver.estado=='inactivo'){
                return res.json({estado:'inactivo'});
            }else if(Driver.estado=='verificarCorreo'){
                return res.json({estado:'verificarCorreo'});
            }else{
                return res.json({estado:'activo'})
            }
        }     
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
        //console.log(e)
        return res.status(401).send('Unauhtorized Request');
    }
}

module.exports = router;