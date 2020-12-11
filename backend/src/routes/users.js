const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');

const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');
const driver = require ('../models/driverModel');

router.get('/api/users', async(req, res)=>{
    //console.log('error');
    try{
        const usuario = await user.find({},{_id:0}).sort({createdAt:-1});
        const User = await user.countDocuments();
        console.log(User);
        return res.json({usuario, User});
    }catch(error){
        res.json({estado:'Error'});  
    }
});
router.get('/api/drivers', async(req, res)=>{
    //console.log('error');
    try{
        const usuario = await driver.find({},{_id:0}).sort({createdAt:-1});
        const User = await driver.countDocuments();
        console.log(User);
        return res.json({usuario, User});
    }catch(error){
        res.json({estado:'Error'});  
    }
});

module.exports = router;