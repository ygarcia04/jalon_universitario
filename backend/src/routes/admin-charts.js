const {Router, json}=require('express');
const router = Router();

const user = require('../models/usersModel');
const driver = require ('../models/driverModel');
const jwt = require('jsonwebtoken');



router.post('/api/admin', async (req, res) => {
    try {
        const{month}=req.body;       
        const vmonth = await user.countDocuments({ "$expr": { "$eq": [{ "$month": "$createdAt" }, month] } });
        const active = await user.countDocuments({ "$expr": { "$and":[{"$eq": [ { "$month": "$createdAt" }, month]},{"$eq":["$estado","activo"]}]} });
        const inactive = await user.countDocuments({ "$expr": { "$and":[{"$eq": [ { "$month": "$createdAt" }, month]},{"$eq":["$estado","inactivo"]}]} });
        const blocked = await user.countDocuments({ "$expr": { "$and":[{"$eq": [ { "$month": "$createdAt" }, month]},{"$eq":["$estado","bloqueado"]}]} });
        const drivers = await driver.countDocuments({ "$expr": { "$eq": [{ "$month": "$createdAt" }, month] } });
        const driversActive = await driver.countDocuments({ "$expr": { "$and":[{"$eq": [ { "$month": "$createdAt" }, month]},{"$eq":["$estado","activo"]}]} });
        const driversInactive = await driver.countDocuments({ "$expr": { "$and":[{"$eq": [ { "$month": "$createdAt" }, month]},{"$eq":["$estado","inactivo"]}]} });
        const driversBlocked = await driver.countDocuments({ "$expr": { "$and":[{"$eq": [ { "$month": "$createdAt" }, month]},{"$eq":["$estado","bloqueado"]}]} });
        
        res.json({month:vmonth,active,inactive,blocked,drivers, driversActive, driversInactive, driversBlocked});     
    } catch (error) {
        console.log(error);
        console.log('Error en el sistema');
        res.json({estado:'Sistema'});
    }
});
module.exports = router;