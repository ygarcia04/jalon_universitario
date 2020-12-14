const {Router}=require('express');
const router = Router();
const driver = require('../models/driverModel');
const jwt = require('jsonwebtoken');


router.post('/api/verific-driver',verifyToken, async(req, res)=>{
    try{
        const {email} = req.body
        const Driver = await driver.findOne({ email:email},{_id:0});
        return res.json({Driver});
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