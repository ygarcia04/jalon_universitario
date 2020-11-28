const {Router, json}=require('express');
const router = Router();

const user = require('../models/usersModel');
const jwt = require('jsonwebtoken');



router.post('/api/admin', async (req, res) => {
    try {
        const{month}=req.body;
        console.log(month);   
        const vmonth = await user.countDocuments({ "$expr": { "$eq": [{ "$month": "$createdAt" }, month] } });
        const active = await user.countDocuments({ "$expr": { "$and":[{"$eq": [ { "$month": "$createdAt" }, month]},{"$eq":["$estado","activo"]}]} });
        const inactive = await user.countDocuments({ "$expr": { "$and":[{"$eq": [ { "$month": "$createdAt" }, month]},{"$eq":["$estado","inactivo"]}]} });
        const blocked = await user.countDocuments({ "$expr": { "$and":[{"$eq": [ { "$month": "$createdAt" }, month]},{"$eq":["$estado","bloqueado"]}]} });
        const usuario = await user.find({ "$expr": { "$eq":["$estado","inactivo"] } });
        res.json({month:vmonth,active,inactive,blocked});     
    } catch (error) {
        console.log(error);
        console.log('Error en el sistema');
        res.json({estado:'Sistema'});
    }
});
module.exports = router;