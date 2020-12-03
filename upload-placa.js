const { Router, json } = require('express');
const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();
var multer = require("multer");
const drive = require('../models/driveModel');

var dirplaca='';
var email = '';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './placa')
    },
    filename: function(req, file, cb) {
        //console.log (req.query.id)
        name=req.query.id + Date.now() + '.jpg';
        email = req.query.id
        dirplaca=name;
        cb(null, name)
    }
})



const placa = multer({
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




router.post('/upload-profile-placa', placa.single('file'), async(req, res) => {

    try {
        console.log(dirplaca)
        //const image = new Image();

        // the file is uploaded when this route is called with formdata.

        // now you can store the file name in the db if you want for further reference.
        const Drive = await drive.findOne({email});
        
        const perfilPath = path.join(__dirname, "../../placa", Drive.picPlaca);
            //console.log (perfilPath)
            //email = Conductor.email; 
            if(await drive.updateOne({email},{$set:{picPlaca:dirplaca}})){
                
            return res.json({estado:'Hecho'});
            }
        else{
            return res.json({estado:'Fallo'});
        } 

    } catch (error) {

        res.json({ estado: 'error' });

    }


});


router.get('/profile-placa', async (req, res) => {


     //let token = req.headers.authorization.split(' ')[1];
        const Drive = await drive.findOne({email});
        if(Drive.estado=='inactivo'){
            return res.json({estado:'inactivo'});
        }

    const imageName = Drive.picPlaca; 
    console.log(imageName);
    const imagePath = path.join(__dirname, "../../placa", imageName);
    console.log(imagePath);

    res.sendFile(imagePath);


});



module.exports = router;