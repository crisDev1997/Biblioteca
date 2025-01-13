const {Order,OrderModel}=require('../models/order.model');
// get all orders list
exports.getAllOrderList=(req,res)=>{
     Order.getAllOrders((err,orders)=>{
        if(err){
            res.send(err)
        }else{
            res.send(orders)
        }
    })
}
exports.getOneOrder=(req,res)=>{
    const {id}=req.params;
    Order.getOrder(id,(err,orders)=>{
        if(err){
            res.send(err)
        }else{
            res.send(orders)
        }
    })
}

exports.getOrdersByAdmin=(req,res)=>{
    const {id_admin}=req.params;
    Order.getOrdersByAdmin(id_admin,(err,books)=>{
        if(err){
        
            res.send(err)
        }else{
            res.send(books)
        }
    })
}
exports.addOrder=(req,res)=>{
    const dataOrder=req.body;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
     OrderModel.addOrder(dataOrder,(err,books)=>{
        if(err){
        
            res.send(err)
        }else{
            res.send(books)
        }
    })
    }
}

exports.updateOrder=(req,res)=>{
    const {id}=req.params;
    const dataOrder=req.body;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
     OrderModel.updateOrder(id,dataOrder,(err,orders)=>{
        if(err){
            res.send(err)
        }else{
            res.send(orders)
        }
    })
    }
}

exports.deleteOrder=(req,res)=>{
    const {id}=req.params;
    OrderModel.removeOrder(id,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
}
exports.addPrueba=(req,res)=>{
    data=req.body
    res.send(data)
}