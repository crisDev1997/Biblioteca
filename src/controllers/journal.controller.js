const {JournalModel,Journal}=require('../models/journal.model')
exports.getAllJournalList=(req,res)=>{
    Journal.getAllJournals((err,journals)=>{
        if(err){
            res.send(err)
        }else{
            res.send(journals)
        }
    })
}

exports.getJournal=(req,res)=>{
    Journal.getJournal(req.params.id,(err,journals)=>{
        if(err){
            res.send(err)
        }else{
            res.send(journals)
        }
    })
}

exports.getJournalsAvaibles=(req,res)=>{
    Journal.getJounalsAvaible((err,journals)=>{
        if(err){
            res.send(err)
        }else{
            res.send(journals)
        }
    })
}


exports.getJournalsNotAvaibles=(req,res)=>{
    Journal.getJounalsNotAvaible((err,journals)=>{
        if(err){
            res.send(err)
        }else{
            res.send(journals)
        }
    })
}


exports.getAllJournalsFromAMagazine=(req,res)=>{
    const {id}=req.params
    Journal.getAllJournalsFromAMagazine(id,(err,journals)=>{
        if(err){
            res.send(err)
        }else{
            res.send(journals)
        }
    })
}
exports.addJournal=(req,res)=>{
    const dataJournal=req.body;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
    JournalModel.addJournal(dataJournal,(err,journal)=>{
        if(err){
            res.send(err)
        }else{
            res.send(journal)
        }
    })
    }
}

exports.updateJournal=(req,res)=>{
    const dataJournal=req.body;
    const {id}=req.params;
    JournalModel.updateJournal(id,dataJournal,(err,journal)=>{
      
        if(err){
            res.send(err)
        }else{
            res.send(journal)
        }
    })
}

exports.deleteJournal=(req,res)=>{
    const {id}=req.params
    JournalModel.deleteJournal(id,(err,journal)=>{
       
        if(err){
            res.send(err)
        }else{
            res.send(journal)
        }
    })
}