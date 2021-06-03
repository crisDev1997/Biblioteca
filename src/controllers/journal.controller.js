const JournalModel=require('../models/journal.model')
exports.getAllJournalList=(req,res)=>{
    JournalModel.getAllJournals((err,books)=>{
        console.log('We are here')
        if(err){
            res.send(err)
        }else{
            console.log('Revistas: ', books);
            res.send(books)
        }
    })
}