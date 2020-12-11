const {Router}=require('express');
const router = Router();
const route = require('../models/routesModel');
const driver= require('../models/driverModel');

router.get('/api/drivers', async(req, res)=>{
    try{
        //Falta la busqueda solamente por la fecha de ese dia 
        
        date = new Date();
        anio=date.getFullYear();
        mes=date.getMonth()+1;
        dia=date.getDate();
        console.log('MEs= ' +date.getMonth())
        console.log('Day= ' +date.getDate())
       
        if (drivers = await route.find().sort({createdAt:-1}) ){
            const count = await route.countDocuments();           
            return res.json({drivers, count}); 
        }else{
            return res.json ({estado:'no hay ruta'});
        }
        
    }catch(error){
        console.log(error)
        res.json({estado:'Error'});  
    }
});

router.get('/api/drivers-admin', async(req, res)=>{
    try{
        console.log('Ver drivers admin')
        //Falta la busqueda solamente por la fecha de ese dia 
        if (usuario = await driver.find({},{_id:0})){
            const User = await driver.countDocuments();           
            return res.json({usuario, User}); 
        }else{
            return res.json ({estado:'no hay ruta'});
        }
        
    }catch(error){
        console.log(error);
        res.json({estado:'Error'});  
    }
});

module.exports = router;