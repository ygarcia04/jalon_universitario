const { Router, json } = require('express');
const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();
var multer = require("multer");
const driver = require('../models/driverModel');

var dir='';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/drivers/profile')
    },
    filename: function(req, file, cb) {
        name=req.query.id + Date.now() + '.jpg';
        dir=name;
        cb(null, name)
    }
})



const profileDriver = multer({
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




router.post('/api/upload-profile-pic-driver', profileDriver.single('file'), async(req, res) => {

    try {

        //const image = new Image();

        // now you can store the file name in the db if you want for further reference.
        let token = req.headers.authorization.split(' ')[1];
        const Driver = await driver.findOne({token});
        if(Driver.estado=='inactivo'){
            return res.json({estado:'inactivo'});
        }
        const perfilPath = path.join(__dirname, "../../upload/drivers/profile", Driver.picPerfil);
            
            email = Driver.email; 
            if(await driver.updateOne({email},{$set:{picPerfil:dir}})){
                defaultPath=path.join(__dirname, "../../upload/drivers/profile/Default.png")
                if(perfilPath!=defaultPath){
                    unlink(perfilPath);
                }
            return res.json({estado:'Hecho'});
            }
        else{
            return res.json({estado:'Fallo'});
        } 



    } catch (error) {

        res.json({ estado: 'error' });

    }


});



router.get('/api/profile-pic-driver', async (req, res) => {


    let token = req.headers.authorization.split(' ')[1];
    const Driver = await driver.findOne({token});
       if(Driver.estado=='inactivo'){
           return res.json({estado:'inactivo'});
       }

       const imageName = Driver.picPerfil; 


       const imagePath = path.join(__dirname, "../../upload/drivers/profile", imageName);
 

       return res.sendFile(imagePath);
       



   /*if (fs.existsSync(imagePath)) {

       res.sendFile(imageName);



   } else res.status(400).send('Error: Image does not exists');*/

});



module.exports = router;