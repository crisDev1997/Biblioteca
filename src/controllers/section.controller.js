const {Section,SectionBooks,SectionInsertUpdate}=require('../models/section.model');
// get all sections
exports.getAllSectionList=(req,res)=>{
    Section.getAllSections((err,sections)=>{
        if(err){
            res.send(err)
        }else{
            res.send(sections)
        }
    })
}

exports.getSection=(req,res)=>{
    Section.getSection(req.params.id,(err,sections)=>{
        if(err){
            res.send(err)
        }else{
            res.send(sections)
        }
    })
}
exports.getBooksFromSectionName=(req,res)=>{
    const {name}=req.params
    SectionBooks.getBooksFromASectionName(name,(err,sections)=>{
        if(err){
            res.send(err)
        }else{
            res.send(sections)
        }
    })
}
exports.getBooksFromSectionId=(req,res)=>{
    const {id}=req.params
    SectionBooks.getBooksFromASectionId(id,(err,sections)=>{
        if(err){
            res.send(err)
        }else{
            res.send(sections)
        }
    })
}

exports.getBooksFromSectionNumber=(req,res)=>{
    const {num}=req.params
    SectionBooks.getBooksFromASectionNumber(num,(err,sections)=>{
        if(err){
            res.send(err)
        }else{
            res.send(sections)
        }
    })
}
exports.getBooksFromSectionTag=(req,res)=>{
    const {tag}=req.params
    SectionBooks.getBooksFromASectionTag(tag,(err,sections)=>{
        if(err){
            res.send(err)
        }else{
            res.send(sections)
        }
    })
}
exports.addNewSection=(req,res)=>{
    const dataSection=req.body
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
     SectionInsertUpdate.addNewSection(dataSection,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
    }
}
exports.addMoreTag=(req,res)=>{
    const {id}=req.params;
    const {newTag}=req.body;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
     SectionInsertUpdate.addMoreTags(id,newTag,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
    }
}
exports.updateSection=(req,res)=>{
    const {id}=req.params;
    const dataSection=req.body;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
     SectionInsertUpdate.updateSection(id,dataSection,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
    }
}

exports.deleteSection=(req,res)=>{
    const {id}=req.params;
    Section.removeSection(id,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
}