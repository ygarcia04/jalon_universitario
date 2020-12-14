const {Router}=require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const driver = require('../models/driverModel');
const route = require ('../models/routesModel');

router.post('/api/routes',verifyToken, async (req, res)=>{  
    //guardar los valores de los datos recibidos en formato json
    const {  tipoDestino, ruta, hora, asientos}= req.body;
    let token = req.headers.authorization.split(' ')[1];
    const ruta_l =ruta.toLowerCase();
    try {
        if (User = await driver.findOne({token})){
            if (Ruta= await route.findOne ({"$expr":{"$and":[{"$eq":["$email",User.email]}, {"$eq":["$horaSalida",hora]}, {"$eq":["$tipoDestino",tipoDestino]}, {"$eq":["$ruta",ruta_l]}]}})){
                return res.json({estado:'repetido'});
            }else{
                const newUser= new route ({nombres:User.nombres,apellidos:User.apellidos, facultad:User.facultad, 
                tipoVehiculo:User.tipo,email:User.email,asientos,tipoDestino:tipoDestino,horaSalida:hora, ruta:ruta_l, telefonoConductor:User.telefono });
                await newUser.save();

                return res.status(200).json({estado:'hecho'});
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'});
    }
});

router.get('/api/get-routes-driver',verifyToken, async (req, res)=>{  
    try {
        let token = req.headers.authorization.split(' ')[1];
        if (User = await driver.findOne({token})){
            if (Ruta= await route.find ({"$expr":{"$eq":["$email",User.email]}}).sort({createdAt:-1})){
                Count = await route.countDocuments({"$expr":{"$eq":["$email",User.email]}})
                return res.json({Ruta,Count});
            }else{
                return res.status(401).json({estado:'error'});
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'});
    }
});

router.get('/api/delete-route-driver',verifyToken, async (req, res)=>{    
    try {
        let token = req.headers.authorization.split(' ')[1];
        let id=req.query.id;
            if (User = await driver.findOne({token})){
                if (Ruta= await route.findOne({_id:id})){
                    await route.deleteOne({_id:id})
                    return res.json({estado:'hecho'});
                }else{
                    return res.status(401).json({estado:'error'});
                }
            }else{
                return res.status(401).json({estado:'error'});
            }
    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'});
    }
});

router.post('/api/restart-route-driver',verifyToken, async (req, res)=>{
    let token = req.headers.authorization.split(' ')[1];
    const {id, asientos}=req.body
    try {
        if (User = await driver.findOne({token})){
            if (Ruta= await route.findOne({_id:id})){
                await route.updateOne({_id:id},{$set:{asientos:asientos}})
                return res.json({estado:'hecho'});
            }else{
                return res.status(401).json({estado:'error'});
            }
        }else{
            return res.status(401).json({estado:'error'});
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({estado:'Error'});
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