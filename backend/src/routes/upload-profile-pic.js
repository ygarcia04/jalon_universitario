const { Router, json } = require('express');
const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();
var multer = require("multer");
const user = require('../models/usersModel');

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
        // Setting Image Size Limit to 2MBs
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        //Success 
        cb(undefined, true)
    }
})




router.post('/api/upload-profile-pic', upload.single('file'), async(req, res) => {

    try {

        //const image = new Image();

        // the file is uploaded when this route is called with formdata.

        // now you can store the file name in the db if you want for further reference.
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

        res.json({ estado: 'error' });

    }


});






router.get('/api/profile-pic', async (req, res) => {


     let token = req.headers.authorization.split(' ')[1];
        const User = await user.findOne({token});
        if(User.estado=='inactivo'){
            return res.json({estado:'inactivo'});
        }

    const imageName = User.picPerfil; 
    console.log(imageName);

    const imagePath = path.join(__dirname, "../../upload", imageName);
    console.log(imagePath);

    res.sendFile(imagePath);



    /*if (fs.existsSync(imagePath)) {

        res.sendFile(imageName);



    } else res.status(400).send('Error: Image does not exists');*/

});



module.exports = router;