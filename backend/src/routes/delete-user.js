const {Router}=require('express');
const driverModel = require('../models/driverModel');
const routesModel = require('../models/routesModel');
const router = Router();
const jwt = require('jsonwebtoken');
const user = require('../models/usersModel');

router.post('/api/delete-account',verifyToken, async (req, res) => {
    try {
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
            email=Driver.email;
            if(await driverModel.deleteOne({token})){
                await routesModel.deleteMany({email})
                return res.status(200).json({estado:'hecho'});
            } 
            return res.status(200).json({estado:'estado'});
        }
        return res.status(401).send('Error');
    } catch (error) {
        console.log(error)
        return res.status(401).send('Error');
    }
    
});


///admin elimina cuenta
router.post('/api/delete-user-admin',verifyToken, async (req, res) => {
    try {
        const {correo } = req.body;    
        const User = await user.findOne({email:correo});
        
        if (!User) {return res.status(401).json({estado:'usuario'});}
            if(await user.deleteOne({email:correo})){
                await routesModel.deleteMany({email:correo})
                return res.status(200).json({estado:'hecho'});
            } 
         res.status(200).json({estado:'estado'});
    } catch (error) {
        return res.status(401).send('Error');
    }
    
});

router.post('/api/delete-driver-admin',verifyToken, async (req, res) => {
    try {
        const {correo } = req.body;
        const User = await driverModel.findOne({email:correo});      
        if (!User) {return res.status(401).json({estado:'usuario'});}
            if(await driverModel.deleteOne({email:correo})){
                return res.status(200).json({estado:'hecho'});
            } 
         res.status(200).json({estado:'estado'});
    } catch (error) {
        console.log(error)
        return res.status(401).send('Error');
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