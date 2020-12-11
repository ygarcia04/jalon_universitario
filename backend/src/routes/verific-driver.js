const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');
const { encrypt, decrypt } = require('./functions');

const driver = require('../models/driverModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');
const driverModel = require('../models/driverModel');

router.post('/api/verific-driver', async(req, res)=>{
    //console.log('error');
    try{
        const {email} = req.body
        const Driver = await driver.findOne({ email:email},{_id:0});
        //const Driver = await driver.find({email_1:driver.email});
        console.log(Driver);
        return res.json({Driver});
    }catch(error){
        res.json({estado:'Error'});  
        console.log('error');
    }
});


module.exports = router;