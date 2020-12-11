const {Router}=require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const driver = require('../models/driverModel');
const route = require ('../models/routesModel');

router.post('/api/routes', async (req, res)=>{  
    //guardar los valores de los datos recibidos en formato json
    const {  tipoDestino, ruta, hora, asientos}= req.body;
    let token = req.headers.authorization.split(' ')[1];

    try {
        if (User = await driver.findOne({token})){
            if (Ruta= await route.findOne ({"$expr":{"$and":[{"$eq":["$email",User.email]}, {"$eq":["$horaSalida",hora]}, {"$eq":["$tipoDestino",tipoDestino]}, {"$eq":["$ruta",ruta]}]}})){
                return res.json({estado:'repetido'});
            }else{
                const newUser= new route ({nombres:User.nombres,apellidos:User.apellidos, facultad:User.facultad, 
                tipoVehiculo:User.tipo,email:User.email,asientos,tipoDestino:tipoDestino,horaSalida:hora, ruta:ruta, telefonoConductor:User.telefono });
                await newUser.save();

                return res.status(200).json({estado:'hecho'});
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'});
    }
    });

   
module.exports = router;