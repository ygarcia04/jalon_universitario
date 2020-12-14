const {Router}=require('express');
const router = Router();
const admin = require('../models/adminModels');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');

//La funcion debe ser async para poder usar await
router.post('/api/signupa', async (req, res)=>{
  try {
    // return res.json({estado:'password'})
    const nombres = 'Eduardo'
    const apellidos = 'Cueva'
    const email = 'ecueva@jalonuniversitario.tk'
    const password = 'Admin123#'
    const estado = 'activo'
    const email_l =email.toLowerCase();   
    /*Revisar si cumple con @jalonuniversitario.cf*/
    if(email_l.match(/@jalonuniversitario.tk$/)){
      const salt = bcrypt.genSaltSync();
      const hash= bcrypt.hashSync(password, salt);
      /*GUARDADO EN LA BASE*/
      const newAdmin = new admin ({nombres, apellidos, email:email_l, password:hash, estado, token:""});
      await newAdmin.save();
      //db.collection('admins2').insertOne(newAdmin)
      const token = await jwt.sign({_id: newAdmin._id}, 'secretkey');
      await admin.updateOne({email:email_l},{$set:{token:token}});       
    }
  } catch (error) {
    console.log(error)
    return res.status(401).json({estado:'Error'})
  }      
});




module.exports = router;
