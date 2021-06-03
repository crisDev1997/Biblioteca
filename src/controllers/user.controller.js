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
    User.getUser(req.params.id,(err,user)=>{
        if(err){
            res.send(err)
        }else{
            res.send(user)
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
exports.createNewUser=(req,res)=>{
    const userData=new UserModel(req.body)
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
        UserModel.createNewUser(userData,(err,user)=>{
            if(err){
                res.send(err)
                res.json({status:false, message:"No se pudo crear la persona o el usuario"});
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
//Actualizando un usuario
exports.updateUser=(req,res)=>{
    const userData=new UserModel(req.body)
    console.log(req.params)
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
        UserModel.updateUser(req.params.ci,userData,(err,user)=>{
            if(err){
                res.send(err)
                res.json({status:false, message:"No se pudo actualizar el usuario"});
            }else{
                
                res.json({
                    status:true,
                    message:'Usuario actualizado!',
                    data:user
                }) 
            }
        })
    }
}
//Eliminado del usuario
exports.deleteUser=(req,res)=>{
    UserModel.deleteUser(req.params.ci,(err,user)=>{
        if(err){
            res.send(err)
            res.json({status:false, message:"No se pudo eliminar el usuario"});
        }else{
            res.json({
                status:true,
                message:'Usuario eliminado',
                data:user
            })     
        }
    })
}