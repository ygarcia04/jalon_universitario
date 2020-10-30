const {Router}=require('express');
const router = Router();
const nodemailer = require('nodemailer');
const prueba = require ('../controllers/correo.js')
const bcrypt = require ('bcrypt-nodejs');
const user = require('../models/users');
const jwt = require('jsonwebtoken');

router.get('/', prueba.hello);

//La funcion debe ser async para poder usar await
router.post('/signup', prueba.nuevousuario);


router.post('/verification', prueba.verificacion); 

module.exports = router;
