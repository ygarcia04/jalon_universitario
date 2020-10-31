
const {Router}=require('express');
const router = Router();

const user = require('../models/usersModel');

router.post('/delete-account', async (req, res) => {
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

module.exports = router;