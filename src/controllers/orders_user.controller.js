const {OrderUserModel,OrderUser}=require('../models/orders_user.model')

exports.getAllOrdersFromUsers=(req,res)=>{
    OrderUser.getAllOrdersFromUsers((err,orders_user)=>{
        if(err){
            res.send(err)
        }else{
            res.send(orders_user)
        }
    })
}

exports.getAllOrdersFromUser=(req,res)=>{
    OrderUser.getOrdersFromUser(req.params.id,(err,orders_user)=>{
        if(err){
            res.send(err)
        }else{
            res.send(orders_user)
        }
    })
}
exports.confirmOrder=async(req,res,next)=>{
    try {
        OrderUserModel.confirmOrder(req.params.id)
        res.json({response:true,message:"El pedido se ha confirmado!"})
    } catch (err) {
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)  
    }
}
exports.verifyConfirm=async (req,res,next)=>{
    try {
        const confirmed=await OrderUserModel.verifyConfirm(req.params.id);
        if(confirmed[0].length>0){
            res.json({response:true,message:"El pedido se ha confirmado!"})
        }else{
            res.json({response:false,message:"El pedido aun no se confirmo"})
        }
    } catch(err) {
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)    
    }
}

exports.deleteOrderFromUser=(req,res)=>{
    OrderUserModel.deleteOrder(req.params.id,(err,orders_user)=>{
        if(err){
            res.send(err)
        }else{
            res.send(orders_user)
        }
    })
}
exports.addOrderFromUser=(req,res)=>{
    let dataOrder=req.body;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
    OrderUserModel.addOrderFromUser(dataOrder,(err,orders_user)=>{
        if(err){
            res.send(err)
        }else{
            res.send(orders_user)
        }
    })
    }
}