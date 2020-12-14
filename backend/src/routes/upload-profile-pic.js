const { Router, json } = require('express');
const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();
var multer = require("multer");
const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');

var dir='';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload')
    },
    filename: function(req, file, cb) {
        name=req.query.id + Date.now() + '.jpg';
        dir=name;
        cb(null, name)
    }
})



const upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 5MBs
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        //Success 
        cb(undefined, true)
    }
})




router.post('/api/upload-profile-pic', upload.single('file'), async(req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        const User = await user.findOne({token});
        if(User.estado=='inactivo'){
            return res.json({estado:'inactivo'});
        }
        const perfilPath = path.join(__dirname, "../../upload", User.picPerfil);          
            email = User.email; 
            if(await user.updateOne({email},{$set:{picPerfil:dir}})){
                defaultPath=path.join(__dirname, "../../upload/Default.png")
                if(perfilPath!=defaultPath){
                    unlink(perfilPath);
                }
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



router.get('/api/profile-pic',verifyToken, async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
       const User = await user.findOne({token});
       if(User.estado=='inactivo'){
           return res.json({estado:'inactivo'});
       }
        const imageName = User.picPerfil; 
        const imagePath = path.join(__dirname, "../../upload", imageName)
        return res.sendFile(imagePath);
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