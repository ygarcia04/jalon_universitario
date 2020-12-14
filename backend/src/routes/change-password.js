const {Router}=require('express');
const router = Router();
const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');

router.post('/api/change-password', verifyToken, async (req, res) => {
    try {
        const { contrasenaActual, contrasenaNueva1, contrasenaNueva2 } = req.body;
        if(contrasenaNueva1!=contrasenaNueva2){
            return res.json({estado:'password'});
        }
        
        let token = req.headers.authorization.split(' ')[1];
        const User = await user.findOne({token});
        if (!User) {return res.status(401).send('Error');}
        
        if(!bcrypt.compareSync(contrasenaActual, User.password) ){
               return res.json({estado:'actual'});
            }
            const salt = bcrypt.genSaltSync();
            const hash= bcrypt.hashSync(contrasenaNueva1, salt);

            if(await user.updateOne({token},{$set:{password:hash}})){
                return res.status(200).json({estado:'hecho'});
            } 
            return res.status(200).json({estado:'estado'});
        
    } catch (error) {
        console.log(error)     
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