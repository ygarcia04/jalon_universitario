const {Router}=require('express');
const router = Router();

const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');
const driver = require ('../models/driverModel');

router.get('/api/users-act', async(req, res)=>{
    try{
        const usuario = await user.find({ "$expr": { "$eq":["$estado","activo"] }},{_id:0}).sort({createdAt:-1});
        const User = await user.countDocuments({ "$expr": { "$eq":["$estado","activo"] }});
        return res.json({usuario, User});
    }catch(error){
        res.json({estado:'Error'});
        console.log('error');
    }
});

router.get('/api/drivers-act', async(req, res)=>{
    try{
        const usuario = await driver.find({ "$expr": { "$eq":["$estado","activo"] }},{_id:0}).sort({createdAt:-1});
        const User = await driver.countDocuments({ "$expr": { "$eq":["$estado","activo"] }});
        return res.json({usuario, User});
    }catch(error){
        res.json({estado:'Error'});
        console.log('error');
    }
});

module.exports = router;