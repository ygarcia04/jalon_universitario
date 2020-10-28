
const {Router}=require('express');
const router = Router();
const GridFsStorage=require('multer-gridfs-storage');
const multer= require('multer');

const user = require('../models/users');
const jwt = require('jsonwebtoken');




router.post('/edit-profile', verifyToken,  async (req, res) => {
    const { telefono, direccion, carrera } = req.body;
    let token = req.headers.authorization.split(' ')[1];

    try {   
        const User = await user.findOne({token});
        console.log(User);
            email = User.email; 
            if(await user.updateOne({email},{$set:{telefono,direccion,carrera}})){
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