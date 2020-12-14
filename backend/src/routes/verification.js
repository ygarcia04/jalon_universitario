const {Router}=require('express');
const router = Router();
const { decrypt } = require('./functions');
const user = require('../models/usersModel');
const driver = require('../models/driverModel');
const jwt = require('jsonwebtoken');

router.post('/api/verification',verifyToken, async (req, res) => {   
    try { 
        const { codigo } = req.body;
        let token = req.headers.authorization.split(' ')[1];
        if(Driver = await driver.findOne({token})){  
            if(codigo==Driver.codigo){
                email = Driver.email; 
                await driver.updateOne({email},{$set:{estado:"inactivo",codigo:""}});
                res.json({estado:'Hecho', type:'driver'});
            }else{
                res.json({estado:'Fallo'});
            }  
        }
        if(User = await user.findOne({token})){
            if(codigo==User.codigo){
                email = User.email; 
                await user.updateOne({email},{$set:{estado:"activo",codigo:""}});
                res.json({estado:'Hecho', type:'usuario'});
            }else{
                res.json({estado:'Fallo'});
            }  

        }          
    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'})
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
        if(User= await driver.findOne({email:dec_email})){
            if(code==User.codigo){
                const token = jwt.sign({_id: User._id}, 'secretkey');
                await driver.updateOne({email:dec_email},{$set:{estado:"inactivo",codigo:"",token}});
                res.json({estado:'Hecho', type:'driver', token});
            }else{
                res.json({estado:'codigo'});
            }

        }else if(User= await user.findOne({email:dec_email})){
            if(code==User.codigo){
                const token = jwt.sign({_id: User._id}, 'secretkey');
                await user.updateOne({email:dec_email},{$set:{estado:"activo",codigo:"",token}});
                res.json({estado:'Hecho', type:'usuario', token});
            }else{
                res.json({estado:'codigo'});
            }

        }else{
            console.log('No existe usuario');
            res.json({estado:'usuario'});
        }      
    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'})
    }
});

async function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauhtorized Request');
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauhtorized Request');
        }

        const payload = await jwt.verify(token, 'secretkey');
        if (!payload) {
            return res.status(401).send('Unauhtorized Request');
        }
        req.userId = payload._id;
        next();
    } catch(e) {
        console.log(e)
        return res.status(401).send('Unauhtorized Request');
    }
}
module.exports = router;