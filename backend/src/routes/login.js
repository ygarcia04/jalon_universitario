
const {Router}=require('express');
const router = Router();

const user = require('../models/users');
const jwt = require('jsonwebtoken');

router.post('/signin', async (req, res) => {
        const { email, password } = req.body;
        const email_l =email.toLowerCase(); 
        const User = await user.findOne({email:email_l});
        if (!User) return res.json({estado:'email'});
        if (User.password !== password) return res.json({estado:'password'});
        if(User.estado =='inactivo') {
            const token = jwt.sign({_id: User._id}, 'secretkey');
            await user.updateOne({email:email_l},{$set:{token:token}})
            return res.status(200).json({estado:'inactivo',token});
        }
            const token = jwt.sign({_id: User._id}, 'secretkey');
            await user.updateOne({email:email_l},{$set:{token:token}})  
        return res.status(200).json({token});
});


module.exports = router;