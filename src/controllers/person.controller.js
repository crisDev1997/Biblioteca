const PersonModel=require('../models/person.model');


exports.getAllPersonList=(req,res)=>{
    PersonModel.getAllPersons((err,persons)=>{
        if(err){
            res.send(err)
        }else{
            res.send(persons)
        }
    })
}