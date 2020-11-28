
const {Router}=require('express');
const router = Router();

const user = require('../models/usersModel');
const admin = require('../models/adminModels');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');


router.post('/api/signin', async (req, res) => {
    

        const { email, password } = req.body;
        const email_l =email.toLowerCase(); 
        const Admin = await admin.findOne({email:email_l});
        if (!Admin){
            const User = await user.findOne({email:email_l});
            if (!User) return res.json({estado:'email'});
            //comparando temporal pass
            if(User.temporal_pass!=""){
                if(bcrypt.compareSync(password, User.temporal_pass)){
                    if(User.estado =='inactivo') {
                        const token = jwt.sign({_id: User._id}, 'secretkey');
                        await user.updateOne({email:email_l},{$set:{token:token,intentos:0,estado:"inactivo"}})
                        return res.status(200).json({estado:'inactivo',token:token});
                    }else{
                        const token = jwt.sign({_id: User._id}, 'secretkey');
                        await user.updateOne({email:email_l},{$set:{token:token,estado:"activo",intentos:0}})
                        return res.status(200).json({estado:'temporal',token:token});
            
                    }
                    //comparando pass
                }else if(bcrypt.compareSync(password, User.password)){
                    if(User.intentos>3){
                        return res.json({estado:'bloqueado'});
                    }
                    if(User.estado =='inactivo') {
                        const token = jwt.sign({_id: User._id}, 'secretkey');
                        await user.updateOne({email:email_l},{$set:{token:token, temporal_pass:"",intentos:0}})
                        return res.status(200).json({estado:'inactivo',token:token});
                    }else{
                        const token = jwt.sign({_id: User._id}, 'secretkey');
                        await user.updateOne({email:email_l},{$set:{token:token, temporal_pass:"",intentos:0}})
                        return res.status(200).json({token:token});  
                    }
    
        
                }
                await user.updateOne({email:email_l},{$set:{intentos:User.intentos+1}});
                if(User.intentos+1>3){
                    await user.updateOne({email:email_l},{$set:{estado:"bloqueado"}});
                    return res.json({estado:'bloqueado'})
                }
                return res.json({estado:'password'})
    
            }
            if(User.intentos>3){
                return res.json({estado:'bloqueado'});
            }
             if(bcrypt.compareSync(password, User.password)){
                if(User.estado =='inactivo') {
                    const token = jwt.sign({_id: User._id}, 'secretkey');
                    await user.updateOne({email:email_l},{$set:{token:token,intentos:0}})
                    return res.status(200).json({estado:'inactivo',token:token});
                }else{
                    const token = jwt.sign({_id: User._id}, 'secretkey');
                    await user.updateOne({email:email_l},{$set:{token:token,intentos:0}})
                    return res.status(200).json({token:token});  
                }
    
            }else{
                await user.updateOne({email:email_l},{$set:{intentos:User.intentos+1}})
                if(User.intentos+1>3){
                    await user.updateOne({email:email_l},{$set:{estado:"bloqueado"}});
                    return res.json({estado:'bloqueado'})
                }
                return res.json({estado:'password'});
            }
            
        }else if(bcrypt.compareSync(password, Admin.password)){
            const token = jwt.sign({_id: Admin._id}, 'secretkey');
            await admin.updateOne({email:email_l},{$set:{token:token}})
            return res.status(200).json({token:token, estado:"admin"});  

        }else{
            return res.json({estado:'password'});
        }       

        
});


module.exports = router;