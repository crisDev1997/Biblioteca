const { validationResult } = require('express-validator');
const {User,UserModel}=require('../models/user.model');


exports.getAllUserList=(req,res)=>{
    User.getAllUsers((err,users)=>{
        
        if(err){
            res.send(err)
        }else{
            
            res.send(users)
        }
    })
}
exports.getUser=(req,res)=>{
    User.getUser(req.params.ci,(err,user)=>{
        if(err){
            res.send(err)
        }else{
            res.send(user)
        }
    })
}
exports.getUserById=(req,res)=>{
    User.getUserByIdUser(req.params.id,(err,user)=>{
        if(err){
            res.send(err)
        }else{
            res.send(user)
        }
    })
}
exports.getBan=(req,res)=>{
    User.getBan(req.params.id,(err,users)=>{
        if(err){
            res.send(err)
        }else{
            res.send(users)
        }
    })
}
exports.getBannedUsers=(req,res)=>{
    User.getBannedUsers((err,users)=>{
        if(err){
            res.send(err)
        }else{
            res.send(users)
        }
    })
}
exports.getAllowUsers=(req,res)=>{
    User.getAllowUsers((err,users)=>{
        if(err){
            res.send(err)
        }else{
            res.send(users)
        }
    })
}
exports.createNewUser= async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).send({success:false, invalid_message:"Llena todos los campos"});
        return
    } 
    //const valores=Object.values(req.body).map(data=>data)
    if(req.body.constructor===Object && Object.keys(req.body).length===0 ){
        res.status(400).send({success:false, invalid_message:"Llena todos los campos"});
    }else{
        try{
        const userData=req.body;
        const duplicatedCi=await UserModel.VerifyCI(userData.ci);
            if(duplicatedCi[0].length>0){
                res.json({invalid_message:"Ese carnet ya esta registrado!"});
            }else{
                const duplicatedEmail=await UserModel.findEmail(userData.correo);
                if(duplicatedEmail[0].length>0){
                res.json({invalid_message:"El correo ya existe!",response:false});
                }else{
                    UserModel.createNewUser(userData,(err,user)=>{
                        if(err){
                            res.send(err)
                        
                        }else{
                            
                            res.json({
                                status:true,
                                message:'Usuario creado',
                                data:user
                            })
                        }
                    })
                }
            }
        }catch(err) {
            if(!err.statusCode){
                err.statusCode=500
            }
            next(err)    
        }
        
    }
}
//Actualizando un usuario
exports.updateUser=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).send({success:false, invalid_message:"Llena todos los campos"});
        return
    } 
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
        try{
            const userData=req.body;
            const duplicatedCi=await UserModel.VerifyCI(userData.ci);
                if(userData.ci!=req.params.ci && duplicatedCi[0].length>0){
                    res.json({invalid_message:"Ese carnet ya lo tiene otro usuario!"});
                }else{
                    const duplicatedEmail=await UserModel.findEmail(userData.correo);
                    let solounduplicado=userData.correo==userData.correo1 && duplicatedEmail[0].length===1? true:duplicatedEmail[0].length>0? false:true
                    
                    if(solounduplicado){
                        UserModel.updateUser(req.params.ci,userData,(err,user)=>{
                            if(err){
                                res.send(err)
                            }else{
                                res.json({
                                    status:true,
                                    message:'Usuario actualizado',
                                    data:user
                                })
                            }
                        })
                    }else{
                        res.json({invalid_message:"Ese correo se encuentra registrado!",response:false});
                    }
                }
            }catch(err) {
                if(!err.statusCode){
                    err.statusCode=500
                }
                next(err)    
            }
    }
}
//Eliminado del usuario
exports.deleteUser=(req,res)=>{
    UserModel.deleteUser(req.params.ci,(err,user)=>{
        if(err){
            res.send(err)
        }else{
            res.json({
                status:true,
                message:'Usuario eliminado',
                data:user
            })     
        }
    })
}
exports.getUserByName=(req,res)=>{
    const {name}=req.params
    User.getUserByName(name,(err,user)=>{
        if(err){
            res.send(err)
            
        }else{
            res.send(user)     
        }
    })
}