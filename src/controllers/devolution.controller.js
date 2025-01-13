const {DevolutionModel,Devolution,DevolutionPending,DevolutionAmplied}=require('../models/devolution.model');
//get all devolutions
exports.getAllDevolutionsList=(req,res)=>{
    Devolution.getAllDevolutions((err,devolutions)=>{
        if(err){
            res.send(err)
        }else{
            res.send(devolutions)
        }
    })
}
exports.getDevolution=(req,res)=>{
    Devolution.getDevolution(req.params.id,(err,devolutions)=>{
        if(err){
            res.send(err)
            res.json({status:false, message:"No se encontro la devolucion"});
        }else{
            
            res.send(devolutions)
            
           
        }
    })
}

exports.getAllPendingDevolutionsList=(req,res)=>{
    DevolutionPending.getAllPendingDevolutions((err,devolutions)=>{
       
        if(err){
            res.send(err)
        }else{
            res.send(devolutions)
        }
    })
}
exports.getAllDevolutionsExpiredList=(req,res)=>{
    Devolution.getAllDevolutionsExpired((err,devolutions)=>{
        if(err){
            res.send(err)
        }else{
            res.send(devolutions)
        }
    })
}
exports.getAllExtendedDevolutionsList=(req,res)=>{
    DevolutionAmplied.getAllAmpliedDevolutions((err,devolutions)=>{
       
        if(err){
            res.send(err)
        }else{
            res.send(devolutions)
        }
    })
}

exports.getAllDevolutionsListReturnedList=(req,res)=>{
    Devolution.getAllDevolutionsReturned((err,devolutions)=>{
        if(err){
            res.send(err)
        }else{
            res.send(devolutions)
        }
    })
}

exports.getAllDevolutionsReturned=(req,res)=>{
    Devolution.getAllDevolutionsReturned((err,devolutions)=>{
        if(err){
            res.send(err)
        }else{
            res.send(devolutions)
        }
    })
}


exports.getAllDevolutionsNotReturnedList=(req,res)=>{
    DevolutionPending.getAllDevolutionsNotReturned((err,devolutions)=>{
        if(err){
            res.send(err)
        }else{
            res.send(devolutions)
        }
    })
}

exports.getAllDevolutionsFromUser=(req,res)=>{
    Devolution.getAllDevolutionsFromUser(req.params.id,(err,devolutions)=>{
        if(err){
            res.send(err)
        }else{
            res.send(devolutions)
        }
    })
}
//Creando un nuevo prestamo
exports.createNewDevolution=(req,res)=>{
    const devolutionData=new DevolutionModel(req.body)
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
        DevolutionModel.createNewDevolution(devolutionData,(err,devolution)=>{
            if(err){
                res.send(err)
                res.json({status:false, message:"No se pudo crear la devolucion"});
            }else{
                
                res.json({
                    status:true,
                    message:'Devolucion creada',
                    data:devolution
                })
                
               
            }
        })
    }
}
//Actualizando una devolucion
exports.updateDevolution=(req,res)=>{
    const devolutionData=new DevolutionModel(req.body)
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
        DevolutionModel.updateDevolution(req.params.id,devolutionData,(err,devolution)=>{
            if(err){
                res.send(err)
                res.json({status:false, message:"No se pudo actualizar la devolucion"});
            }else{
                
                res.json({
                    status:true,
                    message:'Devolucion actualizada!',
                    data:devolution
                })
                
               
            }
        })
    }
}
exports.updateStateDevolution=(req,res)=>{
    const objeto=JSON.parse(req.params.idAndState);
    const {id,state_devolucion}=objeto
    DevolutionModel.updateStateDevolution(id,state_devolucion,(err,devolution)=>{
        if(err){
            res.send(err)
            res.json({status:false, message:"No se pudo cambiar el estado de esta devolucion"});
        }else{
            res.json({
                status:true,
                message:'Devolucion Actualizada',
                data:devolution
            })
        }
    })
}
//Eliminando una devolucion
exports.deleteDevolution=(req,res)=>{
    DevolutionModel.deleteDevolution(req.params.id,(err,devolution)=>{
        if(err){
            res.send(err)
            res.json({status:false, message:"No se pudo eliminar la devolucion"});
        }else{
            res.json({
                status:true,
                message:'Devolucion eliminada',
                data:devolution
            })
        }
    })
    
}