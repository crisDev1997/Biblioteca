const PucharseModel=require('../models/purcharse.model');
// get all orders list
exports.getAllPurcharseList=(req,res)=>{
     PucharseModel.getAllOrders((err,pucharses)=>{
        console.log('We are here')
        if(err){
            res.send(err)
        }else{
            res.send(pucharses)
        }
    })
}