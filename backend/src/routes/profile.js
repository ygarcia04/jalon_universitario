
const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');

const user = require('../models/users');
const jwt = require('jsonwebtoken');

router.get('/profile',verifyToken, async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    try {
        const User= await user.findOne({token});
        nombres=User.nombres;
        apellido=User.apellidos;
        nombre=nombres+' '+apellidos;
        email= User.email;
        direccion= User.direccion;
        registro=User.createdAT;
        res.json({nombre, email,direccion,registro});
    } catch (error) {
        res.json({estado:'error'});
        
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
