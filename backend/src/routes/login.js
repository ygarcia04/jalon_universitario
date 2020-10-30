
const {Router}=require('express');
const router = Router();

const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');


router.post('/signin', async (req, res) => {
        const { email, password } = req.body;
        const email_l =email.toLowerCase(); 
        const User = await user.findOne({email:email_l});
        if (!User) return res.json({estado:'email'});
        //comparando temporal pass
        if(User.temporal_pass!=""){
            if(bcrypt.compareSync(password, User.temporal_pass)){
                if(User.estado =='inactivo') {
                    const token = jwt.sign({_id: User._id}, 'secretkey');
                    await user.updateOne({email:email_l},{$set:{token:token}})
                    return res.status(200).json({estado:'inactivo',token:token});
                }else{
                    const token = jwt.sign({_id: User._id}, 'secretkey');
                    await user.updateOne({email:email_l},{$set:{token:token}})
                    return res.status(200).json({estado:'temporal',token:token});
        
                }
                //comparando pass
            }else if(bcrypt.compareSync(password, User.password)){
                if(User.estado =='inactivo') {
                    const token = jwt.sign({_id: User._id}, 'secretkey');
                    await user.updateOne({email:email_l},{$set:{token:token, temporal_pass:""}})
                    return res.status(200).json({estado:'inactivo',token:token});
                }else{
                    const token = jwt.sign({_id: User._id}, 'secretkey');
                    await user.updateOne({email:email_l},{$set:{token:token, temporal_pass:""}})
                    return res.status(200).json({token:token});  
                }

    
            }
            return res.json({estado:'password'})

        }
         if(bcrypt.compareSync(password, User.password)){
            if(User.estado =='inactivo') {
                const token = jwt.sign({_id: User._id}, 'secretkey');
                await user.updateOne({email:email_l},{$set:{token:token}})
                return res.status(200).json({estado:'inactivo',token:token});
            }else{
                const token = jwt.sign({_id: User._id}, 'secretkey');
                await user.updateOne({email:email_l},{$set:{token:token}})
                return res.status(200).json({token:token});  
            }

        }else{
            return res.json({estado:'password'});
        }

        
});


module.exports = router;