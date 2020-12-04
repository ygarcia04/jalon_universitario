
const {Router}=require('express');
const router = Router();

const drive = require('../models/driveModel');

router.get('/api/delete-placa', async (req, res) => {
    const email = req.query.id;
    console.log (req.query)
    const Drive = await drive.findOne({email});
    if (!Drive) {return res.status(401).send('Error');}

        if(await drive.deleteOne({email})){
            return res.status(200).json({estado:'hecho'});
        } 
         res.status(200).json({estado:'estado'});
});

module.exports = router;