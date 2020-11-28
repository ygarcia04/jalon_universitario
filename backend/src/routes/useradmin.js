const {Router}=require('express');
const router = Router();

const admin = require('../models/adminModels');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');

//La funcion debe ser async para poder usar await
router.post('/api/signupa', async (req, res)=>{
   // return res.json({estado:'password'})
    console.log('fenfefa');
    const nombres = 'Eduardo'
    const apellidos = 'Cueva'
    const email = 'ecueva@jalonuniversitario.tk'
    const password = 'Admin123#'
    const estado = 'activo'
    const email_l =email.toLowerCase();
    
    
    /*Revisar si cumple con @jalonuniversitario.cf*/
    if(email_l.match(/@jalonuniversitario.tk$/)){
        
          /*VERIFICANDO SI EXISTE YA UN CORREO EN LA BASE*/
          /*if( adminR = await admin.findOne({email:email_l})) {
                return res.json({estado: 'correo_repetido'});     
          } else {
            var codigo = getRandomInt(1,10000);
            var codigoS = codigo.toString().padStart(5,'0');
            while(CodigoV=await user.findOne({codigo:codigoS})){
                codigo=getRandomInt(1,10000);
                codigoS = codigo.toString().padStart(5,'0');
            }*/
            console.log (nombres)
            const salt = bcrypt.genSaltSync();
            const hash= bcrypt.hashSync(password, salt);
            /*GUARDADO EN LA BASE*/
            const newAdmin = new admin ({nombres, apellidos, email:email_l, password:hash, estado, token:""});
            await newAdmin.save();
            //db.collection('admins2').insertOne(newAdmin)
            const token = await jwt.sign({_id: newAdmin._id}, 'secretkey');
            await admin.updateOne({email:email_l},{$set:{token:token}});       
          }
    
        /*}else{
            res.json({estado:'correo'});
            console.log('Su correo no es de la UNAH');
        }    */
        
    });

module.exports = router;
