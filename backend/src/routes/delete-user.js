
const {Router}=require('express');
const driverModel = require('../models/driverModel');
const router = Router();

const user = require('../models/usersModel');

router.post('/api/delete-account', async (req, res) => {
    const {contrasenaNueva1, contrasenaNueva2 } = req.body;
    if(contrasenaNueva1!=contrasenaNueva2){
        return res.json({estado:'password'});
    }
    
    let token = req.headers.authorization.split(' ')[1];
    if(User = await user.findOne({token})){

        if(await user.deleteOne({token})){
            return res.status(200).json({estado:'hecho'});
        } 
         return res.status(200).json({estado:'estado'});

    }
    if(Driver= await driverModel.findOne({token})){
        if(await driverModel.deleteOne({token})){
            return res.status(200).json({estado:'hecho'});
        } 
         return res.status(200).json({estado:'estado'});
    }
    return res.status(401).send('Error');
});


///admin elimina cuenta
router.post('/api/delete-user-admin', async (req, res) => {
    const {correo } = req.body;
    console.log(correo);
    
    
    const User = await user.findOne({email:correo});
    
    if (!User) {return res.status(401).json({estado:'usuario'});}

        if(await user.deleteOne({email:correo})){
            return res.status(200).json({estado:'hecho'});
        } 
         res.status(200).json({estado:'estado'});
});

module.exports = router;