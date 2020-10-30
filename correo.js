const nodemailer = require('nodemailer');
//const flash = require ('connect-flash');
const user = require('../models/users');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt'); 
const prueba = {};

prueba.hello = (req, res)=> res.send('Hello-World');

prueba.borrarCuenta = async (req, res) => {
    const idUsuario = req.body.id
    console.log (idUsuario)

    user.findByIdAndRemove(idUsuario, function(err){
        if (err){
            res.send (err);
        }else{
            res.redirect('/')
        }
    })

}
//La funcion debe ser async para poder usar await
prueba.nuevousuario = async (req, res)=>{
    const { nombres, apellidos, email, password,numeroCuenta, direccion, facultad, fechaNacimiento, telefono, sexo}= req.body;
    const email_l =email.toLowerCase();
    /*REvisar si cumple con @unah.hn*/
    //var reg = /\*(@unah.hn)/;
   // if (!nombres && !apellidos && !email && !password != undefined){
        if(email_l.match(/@unah.hn$/)){


            //equivale a escribir new user({email:email, password:password})
            try {
                //creando codigo de validacion
                function getRandomInt(min, max) {
                    result = Math.floor(Math.random() * (max - min)) + min;
                    return result;
                  }
                  codigo = email_l+"/"+getRandomInt(1000,10000);
                  const newUser = new user ({nombres, apellidos, email:email_l, password,numeroCuenta, codigo, estado:"inactivo", direccion,
                  facultad, fechaNacimiento, telefono, sexo});
                  const User1 = await user.findOne({email:email_l});
                await newUser.save();
                const token = await jwt.sign({_id: newUser._id}, 'secretkey');
                res.status(200).json({token});
        
                //enviando correo
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
                    html: "Hola, su código de verificación es: <br><br>" + codigo
                };
        
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                    });
                    console.log(req.body)
                    res.send('hecho');
                } catch (error) {
                    return res.status(401).send('El correo ya existe');}
        
                }else{
                    res.json({estado:'correo'});
                    console.log('Su correo no es de la UNAH');
                }
    
};
    //guardar los valores de los datos recibidos en formato json
    
    //const User1 = await user.findOne({email:email});
    //if (User1) return res.status(401).send('The email doesnt exists');
    //Creando el objeto usuario usando el modelo en users.js
    


prueba.verificacion = async (req, res) => {
    const { codigo } = req.body;
    try {
        codigoR= codigo.split('/');
        email =codigoR[0];
        const User = await user.findOne({email});
        if(codigo==User.codigo){
            await user.updateOne({email:email},{$set:{estado:"activo"}});
            res.json({estado:'Hecho'});
        }else{
            res.json({estado:'Fallo'});
        }

    } catch (error) {
        console.log('Error en el sistema');
    }
};

module.exports = prueba;


