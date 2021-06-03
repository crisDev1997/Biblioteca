const ExtensionModel=require('../models/extension.model');
//get all devolutions
exports.getAllExtensionsList=(req,res)=>{
    ExtensionModel.getAllExtensions((err,extensions)=>{
        console.log('We are here')
        if(err){
            res.send(err)
        }else{
            res.send(extensions)
        }
    })
}