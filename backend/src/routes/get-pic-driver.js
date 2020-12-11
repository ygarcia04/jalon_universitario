const { Router, json } = require('express');
const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();
var multer = require("multer");
const drive = require('../models/driverModel');

router.get('/api/get-pic-driver', async (req, res) => {
    correo=req.query.email
    
    const Drive = await drive.findOne({email:correo});

const imageName = Drive.picPerfil; 

const imagePath = path.join(__dirname, "../../upload/drivers/profile", imageName);


res.sendFile(imagePath);

});

module.exports = router;