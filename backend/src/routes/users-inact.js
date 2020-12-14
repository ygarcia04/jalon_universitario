const {Router}=require('express');
const router = Router();
const user = require('../models/usersModel');
const driver = require ('../models/driverModel');
const jwt = require('jsonwebtoken');

router.get('/api/users-inact',verifyToken, async(req, res)=>{
    try{
        const usuario = await user.find({ "$expr": { "$eq":["$estado","inactivo"] }},{_id:0}).sort({createdAt:-1});
        const User = await user.countDocuments({ "$expr": { "$eq":["$estado","inactivo"] }});
        return res.json({usuario, User});
    }catch(error){
        console.log(error)
        return res.status(401).json({estado:'Error'})
    }
});


router.get('/api/drivers-inact',verifyToken, async(req, res)=>{
    try{
        const usuario = await driver.find({ "$expr": { "$eq":["$estado","inactivo"] }},{_id:0}).sort({createdAt:-1});
        const User = await driver.countDocuments({ "$expr": { "$eq":["$estado","inactivo"] }});
        return res.json({usuario, User});
    }catch(error){
        console.log(error)
        return res.status(401).json({estado:'Error'})
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