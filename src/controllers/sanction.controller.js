const SanctionModel=require('../models/sanction.model');
// get all sanctions
exports.getAllSanctionList=(req,res)=>{
    SanctionModel.getAllSanctions((err,sanctions)=>{
        console.log('We are here')
        if(err){
            res.send(err)
        }else{
            res.send(sanctions)
        }
    })
}