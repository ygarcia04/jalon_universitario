
const {Router}=require('express');
const router = Router();

const user = require('../models/usersModel');
const admin = require('../models/adminModels');
const driver = require('../models/driverModel');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt-nodejs');


router.post('/api/signin', async (req, res) => {
    

        const { email, password } = req.body;
        const email_l =email.toLowerCase(); 
        const Admin = await admin.findOne({email:email_l});
        if (!Admin){
            //verificando usuario conductor
            if(Driver = await driver.findOne({email:email_l})){
                //comparando temporal pass
            if(Driver.temporal_pass!=""){
                if(bcrypt.compareSync(password, Driver.temporal_pass)){
                    if(Driver.estado =='inactivo') {
                        const token = Driver.token;
                        await driver.updateOne({email:email_l},{$set:{intentos:0,estado:"inactivo"}})
                        return res.status(200).json({estado:'inactivo',token:token, type:'driver'});
                    }else{
                        const token = Driver.token;
                        await driver.updateOne({email:email_l},{$set:{estado:"activo",intentos:0}})
                        return res.status(200).json({estado:'temporal',token:token, type:'driver'});
            
                    }
                    //comparando pass
                }else if(bcrypt.compareSync(password, Driver.password)){
                    if(Driver.intentos>3){
                        return res.json({estado:'bloqueado',type:'driver'});
                    }
                    if(Driver.estado =='inactivo') {
                        const token = Driver.token;
                        await driver.updateOne({email:email_l},{$set:{ temporal_pass:"",intentos:0}})
                        return res.status(200).json({estado:'inactivo',token:token, type:'driver'});
                    }else{
                        const token = Driver.token;
                        await driver.updateOne({email:email_l},{$set:{ temporal_pass:"",intentos:0}})
                        return res.status(200).json({estado:'hecho',token:token, type:'driver'});  
                    }
    
        
                }
                await driver.updateOne({email:email_l},{$set:{intentos:Driver.intentos+1}});
                if(Driver.intentos+1>3){
                    await driver.updateOne({email:email_l},{$set:{estado:"bloqueado"}});
                    return res.json({estado:'bloqueado', type:'driver'})
                }
                return res.json({estado:'password', type:'driver'})
    
            }
            if(Driver.intentos>3){
                return res.json({estado:'bloqueado', type:'driver'});
            }
             if(bcrypt.compareSync(password, Driver.password)){
                if(Driver.estado =='inactivo') {
                    const token = Driver.token;
                    console.log(token);
                    await driver.updateOne({email:email_l},{$set:{intentos:0}})
                    return res.status(200).json({estado:'inactivo',token:token, type:'driver'});
                }else{
                    const token = Driver.token;
                    await driver.updateOne({email:email_l},{$set:{intentos:0}})
                    return res.status(200).json({estado:'hecho',token:token, type:'driver'});  
                }
    
            }else if(!bcrypt.compareSync(password, Driver.password)){
                await driver.updateOne({email:email_l},{$set:{intentos:Driver.intentos+1}})
                if(Driver.intentos+1>3){
                    await driver.updateOne({email:email_l},{$set:{estado:"bloqueado"}});
                    return res.json({estado:'bloqueado', type:'driver'})
                }
                return res.json({estado:'password', type:'driver'});
            }
                return res.json({estado:'email'});

            }
            
            //Fin usuario conductor

            //Verificacion si es usuario pasajero
            if(User = await user.findOne({email:email_l})){
            //if (!User) return res.json({estado:'email'});
            //comparando temporal pass
            if(User.temporal_pass!=""){
                if(bcrypt.compareSync(password, User.temporal_pass)){
                    if(User.estado =='inactivo') {
                        const token = User.token;
                        await user.updateOne({email:email_l},{$set:{intentos:0,estado:"inactivo"}})
                        return res.status(200).json({estado:'inactivo',token:token, type:'usuario'});
                    }else{
                        const token = User.token;
                        await user.updateOne({email:email_l},{$set:{estado:"activo",intentos:0}})
                        return res.status(200).json({estado:'temporal',token:token, type:'usuario'});
            
                    }
                    //comparando pass
                }else if(bcrypt.compareSync(password, User.password)){
                    if(User.intentos>3){
                        return res.json({estado:'bloqueado', type:'usuario'});
                    }
                    if(User.estado =='inactivo') {
                        const token = User.token;
                        await user.updateOne({email:email_l},{$set:{ temporal_pass:"",intentos:0}})
                        return res.status(200).json({estado:'inactivo',token:token, type:'usuario'});
                    }else{
                        const token = User.token;
                        await user.updateOne({email:email_l},{$set:{ temporal_pass:"",intentos:0}})
                        return res.status(200).json({estado:'hecho', token:token, type:'usuario'});  
                    }
    
        
                }
                await user.updateOne({email:email_l},{$set:{intentos:User.intentos+1}});
                if(User.intentos+1>3){
                    await user.updateOne({email:email_l},{$set:{estado:"bloqueado"}});
                    return res.json({estado:'bloqueado'})
                }
                return res.json({estado:'password', type:'usuario'})
    
            }
            if(User.intentos>3){
                return res.json({estado:'bloqueado'});
            }
             if(bcrypt.compareSync(password, User.password)){
                if(User.estado =='inactivo') {
                    const token = User.token;
                    await user.updateOne({email:email_l},{$set:{intentos:0}})
                    return res.status(200).json({estado:'inactivo',token:token, type:'usuario'});
                }else{
                    const token = User.token;
                    await user.updateOne({email:email_l},{$set:{intentos:0}})
                    return res.status(200).json({estado:'hecho',token:token, type:'usuario'});  
                }
    
            }else{
                await user.updateOne({email:email_l},{$set:{intentos:User.intentos+1}})
                if(User.intentos+1>3){
                    await user.updateOne({email:email_l},{$set:{estado:"bloqueado"}});
                    return res.json({estado:'bloqueado', type:'usuario'})
                }
                return res.json({estado:'password', type:'usuario'});
            }
            //Fin usuario pasajero
            }
            
            return res.json({estado:'email'});
        }else if(bcrypt.compareSync(password, Admin.password)){
            
            const token = jwt.sign({_id: Admin._id}, 'secretkey');
            await admin.updateOne({email:email_l},{$set:{token:token}})
            return res.status(200).json({token:token, estado:"admin"});  

        }else{
            console.log('No entro');
            return res.json({estado:'password' ,type:'usuario'});
        }       

        
});


module.exports = router;