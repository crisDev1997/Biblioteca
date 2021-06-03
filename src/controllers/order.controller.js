const OrderModel=require('../models/purcharse.model');
// get all orders list
exports.getAllOrderList=(req,res)=>{
     OrderModel.getAllOrders((err,orders)=>{
        console.log('We are here')
        if(err){
            res.send(err)
        }else{
            res.send(orders)
        }
    })
}