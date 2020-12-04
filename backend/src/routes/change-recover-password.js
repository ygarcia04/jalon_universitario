const {Router}=require('express');
const router = Router();

const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');

router.post('/api/recover-password', async (req, res) => {
        const {contrasenaNueva1, contrasenaNueva2 } = req.body;
        if(contrasenaNueva1!=contrasenaNueva2){
            return res.json({estado:'password'});
        }
        
        let token = req.headers.authorization.split(' ')[1];
        const User = await user.findOne({token});
        if (!User) {return res.status(401).send('Error');}
            const salt = bcrypt.genSaltSync();
            const hash= bcrypt.hashSync(contrasenaNueva1, salt);

            if(await user.updateOne({token},{$set:{password:hash}})){
                if(await user.updateOne({token},{$set:{temporal_pass:""}}));
                return res.status(200).json({estado:'hecho'});
            } 
             res.status(200).json({estado:'estado'});
});

module.exports = router;