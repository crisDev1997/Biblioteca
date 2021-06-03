const {AuthAdmin}=require('../models/admin.model');

const jwt=require('jsonwebtoken')
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
exports.postLogin=(req,res)=>{
    const adminAuthData=new AuthAdmin(req.body)
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
        
        AuthAdmin.postAuthLogin(adminAuthData,(err,admin)=>{
        
            const {correo,pass}=adminAuthData;
            if(err){
                res.send(err)
                res.json({status:false, message:"Administrador incorrecto"});
            }else{
                const accessToken=generateAccessToken({correo,pass});
                res.header('authorization',accessToken).json({
                    status:true,
                    message:'Usuario autenticado',
                    token: accessToken, 
                    data:admin
                })
                
               
            }
        })
    }
}
exports.postAuth=(req,res)=>{
    const adminAuthData=new AuthAdmin(req.body)
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
        
        AuthAdmin.postAuthentification(adminAuthData,(err,admin)=>{
        
            const {correo,pass}=adminAuthData;
            if(err){
                res.send(err)
                res.json({status:false, message:"Administrador incorrecto"});
            }else{
                const accessToken=generateAccessToken({correo,pass});
                res.header('authorization',accessToken).json({
                    status:true,
                    message:'Usuario autenticado',
                    token: accessToken, 
                    data:admin
                })
                
               
            }
        })
    }

   
    
}

const generateAccessToken=(admin)=>{
    return jwt.sign(admin,process.env.SECRET,{expiresIn: '60m'});
}