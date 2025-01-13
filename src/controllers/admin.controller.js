const {AdminModel,Admin}=require('../models/admin.model');
const {validationResult}=require('express-validator')

//get all admins list
exports.getAllAdminList=(req,res)=>{
    Admin.getAllAdmin((err,admins)=>{
        if(err){
            res.send(err)
        }else{
            res.send(admins)
        }
    })
}

exports.addAdmin=async (req,res,next)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()) return
    const dataAdmin=req.body;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
        try {
            const duplicatedCi=await AdminModel.VerifyCI(dataAdmin.ci);
            if(duplicatedCi[0].length>0){
                res.send({message:"Ese carnet ya existe!",response:false});
            }else{
                const duplicatedEmail=await AdminModel.findEmail(dataAdmin.correo);
                if(duplicatedEmail[0].length>0){
                res.send({message:"El correo ya existe!",response:false});
                }else{
                    AdminModel.addNewAdmin(dataAdmin,(err,admin)=>{
                        if(err){
                            res.send(err)
                        }else{
                            res.send(admin)
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