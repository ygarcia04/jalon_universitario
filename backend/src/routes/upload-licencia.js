const { Router, json } = require('express');
const path = require('path');
const router = Router();
var multer = require("multer");
const drive = require('../models/driverModel');
const jwt = require('jsonwebtoken');

var dirlicencia='';
var email = '';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/drivers/licencia')
    },
    filename: function(req, file, cb) {
        name=req.query.id + Date.now() + '.jpg';
        email = req.query.id
        dirlicencia=name;
        cb(null, name)
    }
})



const licencia = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        //Success 
        cb(undefined, true)
    }
})



router.post('/api/upload-profile-licencia', licencia.single('file'), async(req, res) => {
    try {
        const email = req.query.id
        const Drive = await drive.findOne({email: email});   
        const perfilPath = path.join(__dirname, "./upload/drivers/licencia", Drive.picLicencia);

        if(await drive.updateOne({email},{$set:{picLicencia:dirlicencia}})){
                
            return res.json({estado:'Hecho'});
        }
        else{
            return res.json({estado:'Fallo'});
        } 
    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'})
    }
});


router.get('/api/profile-licencia',verifyToken, async (req, res) => {
    try {
        correo=req.query.email
        const Drive = await drive.findOne({email:correo});
        const imageName = Drive.picLicencia; 
        const imagePath = path.join(__dirname, "../../upload/drivers/licencia", imageName);
        res.sendFile(imagePath);
    } catch (error) {
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