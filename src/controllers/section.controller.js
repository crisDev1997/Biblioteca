const SectionModel=require('../models/section.model');
// get all sections
exports.getAllSectionList=(req,res)=>{
    SectionModel.getAllSections((err,sections)=>{
        console.log('We are here')
        if(err){
            res.send(err)
        }else{
            res.send(sections)
        }
    })
}