const {AdminModel}=require('../models/admin.model');

//get all admins list
exports.getAllAdminList=(req,res)=>{
    AdminModel.getAllAdmin((err,admins)=>{
        console.log('We are here')
        if(err){
            res.send(err)
        }else{
            res.send(admins)
        }
    })
}