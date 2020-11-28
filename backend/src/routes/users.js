const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');

const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');
const usersModel = require('../models/usersModel');

router.get('/api/users', async(req, res)=>{
    //console.log('error');
    try{
        const usuario = await user.find({},{_id:0});
        const User = await user.countDocuments();
        console.log(User);
        return res.json({usuario, User});
    }catch(error){
        res.json({estado:'Error'});  
    }
});

module.exports = router;