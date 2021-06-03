const PersonModel=require('../models/person.model');


exports.getAllPersonList=(req,res)=>{
    PersonModel.getAllPersons((err,persons)=>{
        console.log('We are here')
        if(err){
            res.send(err)
        }else{
            res.send(persons)
        }
    })
}