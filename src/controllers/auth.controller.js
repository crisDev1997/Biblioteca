const {AuthAdmin}=require('../models/admin.model');
const {AuthUser,UserModel,UserAccount}=require('../models/user.model');
const jwt=require('jsonwebtoken');
const e = require('express');
require('dotenv').config()
exports.getLogin=(req,res)=>{
    res.send(`
        <html>
            <head>
            <title>Login</title>
            </head>
            <body>
            <form method="POST" action="/auth">
            Correo:<input type="text" name="correo"><br>
            Contraseña:<input type="password" name="pass"><br>
            <input type="submit" value="Iniciar Sesion">
            </form>
            </body>
        </html>
    `);
}

exports.postAuth=(req,res,next)=>{
    const adminAuthData=req.body;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
        AuthAdmin.postAuthentification(adminAuthData,(err,admin)=>{
            const {correo,pass}=adminAuthData;
            if(err){
              
                const error=new Error("Error en la conexion!")
                throw error;
            }else{
                try {
                    if(admin.length==0){
                        const error=new Error("Correo o contraseña incorrecta!")
                        error.statusCode=401;
                        throw error;
    
                    }else{
                        const id_admin=admin[0].id_admin
                        
                        const accessToken=generateAccessToken({correo,id_admin});
                        res.header('Authorization',accessToken).json({
                        status:true,
                        message:'Usuario autenticado',
                        token: accessToken, 
                        data:admin
                        })
                    }
                } catch (err) {
                    if(!err.statusCode){
                        err.statusCode=500
                    }
                    next(err)
                }
                  
            }
        })
    }
}

const generateAccessToken=(admin)=>{
    return jwt.sign(
        {
            correo:admin.correo,
            adminId:admin.id_admin},process.env.SECRET,{expiresIn: '1d'});
}

exports.userPostLogin=(req,res,next)=>{
    const userAuthData=req.body;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, invalid_message:"Llena todos los campos"});
    }else{
        
        AuthUser.postAuthentification(userAuthData,(err,user)=>{
            const {correo,pass}=userAuthData;
            if(err){
                const error=new Error("Error en la conexion!")
                throw error;
            }else{
                    try {
                        if(user.length==0){
                            const error=new Error("Correo o contraseña incorrecta!")
                            error.statusCode=401;
                            throw error;
                        }else{
                            const id_usuario=user[0].id_admin
                            const accessToken=generateUserAccessToken({correo,id_usuario});
                            res.header('Authorization',accessToken).json({
                            status:true,
                            message:'Usuario autenticado',
                            token: accessToken, 
                            data:user
                            })
                        }
                        
                    } catch (err) {
                        if(!err.statusCode){
                            err.statusCode=500
                        }
                        
                        next(err)
                    }
                    }
                })
        
        
    }
}
const generateUserAccessToken=(usuario)=>{
    return jwt.sign(
        {
            correo:usuario.correo,
            userId:usuario.id_usuario},process.env.SECRET,{expiresIn: '1d'});
}
exports.getUserDataByEmail=async(req,res,next)=>{
    const correo=req.params.correo
        try {
            const email=await UserModel.getUserByEmail(correo);
            if(email[0].length>0){
                res.json({response:true,data:email})
            }else{
                res.json({response:false,invalid_message:"Correo no registrado"})
            }
            } catch (err) {
                if(!err.statusCode){
                    err.statusCode=500
                }
                
                next(err)
            
        }
    
}
exports.verifyNotDuplicatedEmailRegister=async(req,res,next)=>{
    const correo=req.params.correo
    try {
        const email=await UserModel.verifyNotDuplicatedEmailRegister(correo);
        if(email[0].length>0){
            res.json({response:true,invalid_message:"Ese correo ya esta registrado!"})
        }else{
            res.json({response:false})
        }


    } catch (err) {
        if(!err.statusCode){
            err.statusCode=500
        }
        
        next(err)
    }
}

exports.createUserAccount=(req,res)=>{
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, invalid_message:"Llena todos los campos"});
    }else{
        const {pass,id_usuario}=req.body;
        UserAccount.createUserAccount(id_usuario,pass,
            (err,users)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send(users)
                }
            })
    
    }
}

