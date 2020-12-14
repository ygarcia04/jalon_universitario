const {Router}=require('express');
const router = Router();
const route = require('../models/routesModel');
const driver= require('../models/driverModel');
const jwt = require('jsonwebtoken');

router.get('/api/drivers',verifyToken, async(req, res)=>{
    try{   
        if (drivers = await route.find().sort({createdAt:-1}) ){
            const count = await route.countDocuments();           
            return res.json({drivers, count}); 
        }else{
            return res.json ({estado:'no hay ruta'});
        }
        
    }catch(error){
        console.log(error)
        return res.status(401).send('Error');   
    }
});

router.get('/api/drivers-admin',verifyToken, async(req, res)=>{
    try{
        if (usuario = await driver.find({},{_id:0})){
            const User = await driver.countDocuments();           
            return res.json({usuario, User}); 
        }else{
            return res.json ({estado:'no hay ruta'});
        }
        
    }catch(error){
        console.log(error);
        return res.status(401).send('Error');  
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
        console.log(e)
        return res.status(401).send('Unauhtorized Request');
    }
}
module.exports = router;