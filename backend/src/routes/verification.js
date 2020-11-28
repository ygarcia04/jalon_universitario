
const {Router}=require('express');
const router = Router();
const { encrypt, decrypt } = require('./functions');

const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');

router.post('/api/verification', async (req, res) => {
        
    try { 
        const { codigo } = req.body;
        let token = req.headers.authorization.split(' ')[1]
        const User = await user.findOne({token});
        console.log(User);
        if(codigo==User.codigo){
            email = User.email; 
            await user.updateOne({email},{$set:{estado:"activo",codigo:""}});
            res.json({estado:'Hecho', token});
        }else{
            res.json({estado:'Fallo', token});
        }     
          
          
    } catch (error) {
        console.log('Error en el sistema');
        res.json({estado:'Sistema', token});
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