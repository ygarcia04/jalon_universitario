const {Router}=require('express');
const router = Router();
const { unlink, pathExists } = require('fs-extra');
const drive = require('../models/driverModel');
const jwt = require('jsonwebtoken');
const path = require('path');

router.get('/api/delete-licencia', async (req, res) => {
    try {
        const email = req.query.id;
        const Drive = await drive.findOne({email});

        if (!Drive) {return res.status(401).send('Error');}
        imageLicencia=Drive.picLicencia;
            if(await drive.deleteOne({email})){
                if(imageLicencia!=""){
                    defaultPath=path.join(__dirname, "../../upload/drivers/licencia",imageLicencia)
                    pathExists(defaultPath)
                        .then(exists => unlink(defaultPath))
                    return res.status(200).json({estado:'hecho'});
                }
                
            } 
             res.status(200).json({estado:'estado'}); 
    } catch (error) {
        console.log(error)
        return res.status(401).send('Error');
    }
    
});


module.exports = router;