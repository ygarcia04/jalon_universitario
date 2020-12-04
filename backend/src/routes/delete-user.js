
const {Router}=require('express');
const router = Router();

const user = require('../models/usersModel');

router.post('/api/delete-account', async (req, res) => {
    const {contrasenaNueva1, contrasenaNueva2 } = req.body;
    if(contrasenaNueva1!=contrasenaNueva2){
        return res.json({estado:'password'});
    }
    
    let token = req.headers.authorization.split(' ')[1];
    const User = await user.findOne({token});
    if (!User) {return res.status(401).send('Error');}

        if(await user.deleteOne({token})){
            return res.status(200).json({estado:'hecho'});
        } 
         res.status(200).json({estado:'estado'});
});

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