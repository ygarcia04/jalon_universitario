
const {Router}=require('express');
const router = Router();

const user = require('../models/usersModel');
const driver = require('../models/driverModel');
const jwt = require('jsonwebtoken');



router.post('/api/edit-profile', verifyToken, async (req, res) => {
    const { telefono, direccion, facultad } = req.body;
    let token = req.headers.authorization.split(' ')[1];
    try {   
        const User = await user.findOne({token});
        if(User.estado=='inactivo'){
            return res.json({estado:'inactivo'});
        }
        
        
            email = User.email; 
            if(await user.updateOne({email},{$set:{telefono,direccion,facultad}})){
            res.json({estado:'Hecho'});
            }
        else{
            res.json({estado:'Fallo'});
        }       
    } catch (error) {
        console.log('Error en el sistema');
        res.json({estado:'Sistema', token});
    }
});

//Editar perfil conductor
router.post('/api/edit-profile-driver', verifyToken, async (req, res) => {
    const { telefono, direccion, facultad } = req.body;
    let token = req.headers.authorization.split(' ')[1];
    try {   
        const Driver = await driver.findOne({token});
        if(Driver.estado=='inactivo'){
            return res.json({estado:'inactivo'});
        }
        
        
            email = Driver.email; 
            if(await driver.updateOne({email},{$set:{telefono,direccion,facultad}})){
            res.json({estado:'Hecho'});
            }
        else{
            res.json({estado:'Fallo'});
        }       
    } catch (error) {
        console.log('Error en el sistema');
        res.json({estado:'Sistema', token});
    }
});


//verificar token
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
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;