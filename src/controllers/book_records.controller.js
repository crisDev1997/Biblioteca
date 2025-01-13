const BookRecordsModel=require('../models/book_records.model');
// get all books list
exports.getAllBookRecordsList=(req,res)=>{
    BookRecordsModel.getAllBooks_records((err,books_records)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books_records)
        }
    })
}