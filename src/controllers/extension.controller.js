const {ExtensionModel,Extension,ExtensionUpdate}=require('../models/extension.model');
//get all devolutions
exports.getAllExtensionsList=(req,res)=>{
    Extension.getAllExtensions((err,extensions)=>{
        if(err){
            res.send(err)
        }else{
            res.send(extensions)
        }
    })
}

exports.getExtension=(req,res)=>{
    Extension.getExtension(req.params.id,(err,extend)=>{
        if(err){
            res.send(err)
        }else{
            res.send(extend)
        }
    })
}
exports.addExtend=(req,res)=>{
    const dataExtend=req.body
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
    ExtensionModel.addExtend(dataExtend,(err,extend)=>{
        if(err){
            res.send(err)
        }else{
            res.send(extend)
        }
    })
    }
}
exports.updateExtend=(req,res)=>{
    const dataBook=req.body
    const {id}=req.params
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
    ExtensionUpdate.updateExtend(id,dataBook,(err,extend)=>{
        if(err){
            res.send(err)
        }else{
            res.send(extend)
        }
    })
    }
}

exports.deleteExtend=(req,res)=>{
    const {id}=req.params;
    ExtensionModel.deleteExtend(id,(err,extend)=>{
        if(err){
            res.send(err)
        }else{
            res.send(extend)
        }
    })
}