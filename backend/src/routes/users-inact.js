const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');

const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');
const usersModel = require('../models/usersModel');

router.get('/api/users-inact', async(req, res)=>{
    try{
        const usuario = await user.find({ "$expr": { "$eq":["$estado","inactivo"] }},{_id:0});
        const User = await user.countDocuments({ "$expr": { "$eq":["$estado","inactivo"] }});
        console.log(User);
        return res.json({usuario, User});
    }catch(error){
        res.json({estado:'Error'});
        console.log('error');
    }
});

module.exports = router;