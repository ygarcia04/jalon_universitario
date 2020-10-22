
const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');

const user = require('../models/users');
const jwt = require('jsonwebtoken');

router.get('/', (req, res)=> res.send('Hello-World'));

//La funcion debe ser async para poder usar await
router.post('/signup', async (req, res)=>{
    //guardar los valores de los datos recibidos en formato json
    const { nombres, apellidos, email, password,numeroCuenta, direccion}= req.body;
    //const User1 = await user.findOne({email:email});
    //if (User1) return res.status(401).send('The email doesnt exists');
    //Creando el objeto usuario usando el modelo en users.js
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
            
            /*GUARDADO EN LA BASE*/
            const newUser = new user ({nombres, apellidos, email:email_l, password,numeroCuenta, codigo:codigoS, estado:"inactivo", direccion});
            await newUser.save();
            const token = await jwt.sign({_id: newUser._id}, 'secretkey');
            
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


router.post('/verification', async (req, res) => {
    const { codigo } = req.body;
    try {   
        const User = await user.findOne({codigo});
        if(codigo==User.codigo){
            email = User.email; 
            await user.updateOne({email:email},{$set:{estado:"activo",codigo:""}});
            res.json({estado:'Hecho'});
        }else{
            res.json({estado:'Fallo'});
        }
        
    } catch (error) {
        console.log('Error en el sistema');
    }
});


module.exports = router;