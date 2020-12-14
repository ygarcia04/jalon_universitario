const { Router, json } = require('express');
const path = require('path');
const router = Router();
const drive = require('../models/driverModel');
const jwt = require('jsonwebtoken');

router.get('/api/get-pic-driver',verifyToken, async (req, res) => {
    try {
        correo=req.query.email   
        const Drive = await drive.findOne({email:correo});
        const imageName = Drive.picPerfil; 
        const imagePath = path.join(__dirname, "../../upload/drivers/profile", imageName);
        res.sendFile(imagePath);
    } catch (error) {
        console.log(error)
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