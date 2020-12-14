
const {Router}=require('express');
const router = Router();
const drive = require('../models/driverModel');
const jwt = require('jsonwebtoken');
const path = require('path');
const { unlink, pathExists} = require('fs-extra');

router.get('/api/delete-placa', async (req, res) => {
    try {
        const email = req.query.id;
        const Drive = await drive.findOne({email});
        if (!Drive) {return res.status(401).send('Error');}
        imageLicencia=Drive.picLicencia;
        imageRevision=Drive.picRevision;
        imagePlaca=Drive.picPlaca;
        if(await drive.deleteOne({email})){
            if(imagePlaca==""){
                PathLicencia=path.join(__dirname, "../../upload/drivers/licencia",imageLicencia)
                PathRevision=path.join(__dirname, "../../upload/drivers/revision",imageRevision)
                pathExists(PathLicencia)
                    .then(exists => unlink(PathLicencia))
                pathExists(PathRevision)
                    .then(exists => unlink(PathRevision))
                return res.status(200).json({estado:'hecho'});
            }else{
                PathLicencia=path.join(__dirname, "../../upload/drivers/licencia",imageLicencia)
                PathRevision=path.join(__dirname, "../../upload/drivers/revision",imageRevision)
                PathPlaca=path.join(__dirname, "../../upload/drivers/placa",imagePlaca)
                pathExists(PathLicencia)
                    .then(exists => unlink(PathLicencia))
                pathExists(PathRevision)
                    .then(exists => unlink(PathRevision))
                pathExists(PathPlaca)
                    .then(exists => unlink(PathPlaca))
                return res.status(200).json({estado:'hecho'});
            }
            
        } 
         res.status(200).json({estado:'estado'});
    } catch (error) {
        console.log(error)
    }
    
});


module.exports = router;