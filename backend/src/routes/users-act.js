const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');

const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');
const usersModel = require('../models/usersModel');

router.get('/api/users-act', async(req, res)=>{
    try{
        const usuario = await user.find({ "$expr": { "$eq":["$estado","activo"] }},{_id:0});
        const User = await user.countDocuments({ "$expr": { "$eq":["$estado","activo"] }});
        console.log(usuario);
        return res.json({usuario, User});
    }catch(error){
        res.json({estado:'Error'});
        console.log('error');
    }
});

module.exports = router;