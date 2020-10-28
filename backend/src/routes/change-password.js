
const {Router}=require('express');
const router = Router();

const user = require('../models/users');
const jwt = require('jsonwebtoken');

router.post('/change-password', verifyToken, async (req, res) => {
        const { contrasenaActual, contrasenaNueva1, contrasenaNueva2 } = req.body;
        if(contrasenaNueva1!=contrasenaNueva2){
            return res.json({estado:'password'});
        }
        let token = req.headers.authorization.split(' ')[1];
        const User = await user.findOne({token});
        if (!User) {return res.status(401).send('Error');}
        if (User.password !== contrasenaActual) return res.json({estado:'actual'});

            await user.updateOne({token},{$set:{password:contrasenaNueva1}})  
        return res.status.json({estado:'hecho'});
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