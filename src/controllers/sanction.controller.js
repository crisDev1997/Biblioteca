const {Sanction,SanctionWithDevolution,SanctionModel}=require('../models/sanction.model');
// get all sanctions
exports.getAllSanctionList=(req,res)=>{
    Sanction.getAllSanctions((err,sanctions)=>{
        if(err){
            res.send(err)
        }else{
            res.send(sanctions)
        }
    })
}
exports.getSanctionByUserCI=(req,res)=>{
    const ci=req.params.ci
    Sanction.getSanction(ci,(err,sanction)=>{
        if(err){
            res.send(err)
        }else{
            
            res.send(sanction)
        }
    })
}
exports.getSanctionByIdBan=(req,res)=>{
    const id=req.params.id
    Sanction.getSanctionById(id,(err,sanction)=>{
        if(err){
            res.send(err)
        }else{
            res.send(sanction)
        }
    })
}
exports.getSanctionsWithDevolution=(req,res)=>{
    Sanction.getUsersNotReturn((err,sanctions)=>{

        if(err){
            res.send(err)
        }else{
            res.send(sanctions)
        }
    })
}
exports.getSanctionsBookReturned=(req,res)=>{
    Sanction.getUsersBookReturned((err,sanctions)=>{
        if(err){
            res.send(err)
        }else{
            res.send(sanctions)
        }
    })
}
exports.addSanction=(req,res)=>{
    const dataSanction=req.body
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
        SanctionModel.addUser(dataSanction,(err,sanctions)=>{
            if(err){
                res.send(err)
            }else{
                res.send(sanctions)
            }
        })
    }
}

exports.updateSanction=(req,res)=>{
    const {id}=req.params;
    const dataSanction=req.body;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
        SanctionModel.updateSanction(id,dataSanction,(err,sanctions)=>{
            if(err){
                res.send(err)
            }else{
                res.send(sanctions)
            }
        })
    }
}

exports.deleteSanction=(req,res)=>{
    const {id}=req.params
    SanctionModel.deleteSanction(id,(err,sanctions)=>{
        if(err){
            res.send(err)
        }else{
            res.send(sanctions)
        }
    })
}