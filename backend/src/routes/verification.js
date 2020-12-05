
const {Router}=require('express');
const router = Router();
const { encrypt, decrypt } = require('./functions');

const user = require('../models/usersModel');
const driver = require('../models/driverModel');
const jwt = require('jsonwebtoken');

router.post('/api/verification', async (req, res) => {
        
    try { 
        const { codigo } = req.body;
        console.log(codigo);
        let token = req.headers.authorization.split(' ')[1];
        if(Driver = await driver.findOne({token})){
            if(codigo==Driver.codigo){
                email = Driver.email; 
                await driver.updateOne({email},{$set:{estado:"activo",codigo:""}});
                res.json({estado:'Hecho', token});
            }else{
                res.json({estado:'Fallo', token});
            }  

        }
        if(User = await user.findOne({token})){
            if(codigo==User.codigo){
                email = User.email; 
                await user.updateOne({email},{$set:{estado:"activo",codigo:""}});
                res.json({estado:'Hecho', token});
            }else{
                res.json({estado:'Fallo', token});
            }  

        }
   
          
          
    } catch (error) {
        console.log(error);
        res.json({estado:'Sistema'});
    }
});

router.get('/api/verification', async (req, res) => {
    
    try {
        const userIv=req.query.user;
        const userContent=req.query.user1;
        const code=req.query.code;
        const hash={
            iv: userIv,
            content: userContent
        }
        const dec_email = decrypt(hash);
        if(User= await user.findOne({email:dec_email})){
            if(code==User.codigo){
                const token = jwt.sign({_id: User._id}, 'secretkey');
                await user.updateOne({email:dec_email},{$set:{estado:"activo",codigo:"",token}});
                res.json({estado:'Hecho', token});
            }else{
                res.json({estado:'codigo'});
            }

        }else{
            console.log('No existe usuario');
            res.json({estado:'usuario'});
        }      
    } catch (error) {
        console.log(error);
        res.json({estado:'Sistema'});
    }
});





module.exports = router;