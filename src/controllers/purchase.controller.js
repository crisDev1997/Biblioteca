const {Purchase,PurchaseDetails,PurchaseAllDetails,PurchaseWithDetails,PurchaseModel,PurchaseDetailsModel}=require('../models/purchase.model');
// get all orders list
exports.getAllPurchaseList=(req,res)=>{
     Purchase.getAllPurchases((err,purchases)=>{
        
        if(err){
            res.send(err)
        }else{
            res.send(purchases)
        }
    })
    
}
exports.getAllPurchaseFromAdmin=(req,res)=>{
    Purchase.getAllPurchasesFromAdmin(req.params.id,(err,purchases)=>{
        
        if(err){
            res.send(err)
        }else{
            res.send(purchases)
        }
    })
}
exports.getOnePurcharse=(req,res)=>{
    const {id}=req.params
    PurchaseDetails.getOnePurchase(id,(err,purchases)=>{
        if(err){
            res.send(err)
        }else{
            res.send(purchases)
        }
    })
}

exports.getAllPurchaseDetailsList=(req,res)=>{
    PurchaseAllDetails.getAllDetailsPurchases((err,purchases)=>{
        if(err){
            res.send(err)
        }else{
            res.send(purchases)
        }
    })
}

exports.addNewPurchases=(req,res)=>{
    const dataPurchase=req.body
    const size=dataPurchase.id_libro.split(",").length;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
    PurchaseWithDetails.addPurchase(dataPurchase,size,(err,purchase)=>{
        if(err){
            res.send(err)
        }else{
            res.send(purchase)
        }
    })
    }
}

exports.updatePurchase=(req,res)=>{
    const dataPurchase=req.body
    const {id}=req.params
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
    PurchaseModel.updatePurchase(id,dataPurchase,(err,purchase)=>{
        if(err){
            res.send(err)
        }else{
            res.send(purchase)
        }
    })
    }
}

exports.updateDetailPurchase=(req,res)=>{
    const dataDetail=req.body
    const {id}=req.params
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
    PurchaseDetailsModel.updatePurchaseDetails(id,dataDetail,(err,purchase)=>{
        if(err){
            res.send(err)
        }else{
            res.send(purchase)
        }
    })
    }
}
exports.deletePurchase=(req,res)=>{
    const {id}=req.params
    PurchaseModel.deletePurchase(id,(err,purchase)=>{
        if(err){
            res.send(err)
        }else{
            res.send(purchase)
        }
    })
}

exports.deleteDetail=(req,res)=>{
    const {id}=req.params
    PurchaseDetailsModel.removePurchaseDetail(id,(err,purchase)=>{
        if(err){
            res.send(err)
        }else{
            res.send(purchase)
        }
    })
}