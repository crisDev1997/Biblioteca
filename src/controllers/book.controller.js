const {Book,BookSection,BookModel}=require('../models/book.model');
// get all books list
const defaultResBooks=function(err,books,res){
    if(err){
        res.send(err)
    }else{
        res.send(books)
    }
}





exports.getAllbookList=(req,res)=>{
    Book.getAllBooks((err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
}

exports.getAllAvaibleBookList=(req,res)=>{
    BookSection.getAllAvaibleBooks((err,books)=>{
        
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
}
exports.getNotAvaibleBookList=(req,res)=>{
    BookSection.getNotAvaibleBooks((err,books)=>{
        
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
}
exports.getRegisteredBooksNotAvaibleList=(req,res)=>{
    BookSection.getRegisteredBooksNotAvaible((err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
}
exports.addMoreBooks=(req,res)=>{
    const {id}=req.params;
    const quantity=req.body.quantity;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
    BookModel.addMoreBooks(id,quantity,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
    }
}

exports.addBook=(req,res)=>{
    const dataBook=req.body
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
    BookModel.addBook(dataBook,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
    }
}

exports.updateBook=(req,res)=>{
    const dataBookUpdate=req.body
    console.log(dataBookUpdate)
    const {id}=req.params
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
    BookModel.updateBook(dataBookUpdate,id,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
    }
}
exports.deleteBook=(req,res)=>{
    const {id}=req.params
    BookModel.deleteBook(id,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
}