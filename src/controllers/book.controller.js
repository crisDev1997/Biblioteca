const {Book,BookSection,BookModel,Journal}=require('../models/book.model');
// get all books list
const defaultResBooks=function(err,books,res){
    if(err){
        res.send(err)
    }else{
        res.send(books)
    }
}





exports.getAllbookList=(req,res)=>{
    BookSection.getAllBooks((err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
}
exports.getBook=(req,res)=>{
    BookModel.getBook(req.params.id,(err,books)=>{
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

exports.getBooksFromSection=(req,res)=>{
    const {id}=req.params
    BookSection.getAllBooksFromASection(id,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
    
}

exports.getBooksByGenre=(req,res)=>{
    const {genre}=req.params
    BookSection.getAllBooksByGenre(genre,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
   
}
exports.addMoreBooks=(req,res)=>{
    const objeto=JSON.parse(req.params.idAndQuantity);
    const {id,quantity}=objeto
    BookModel.addMoreBooks(id,quantity,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
    
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

exports.addNewJournal=(req,res)=>{
    const dataJournal=req.body
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
    Journal.newJournal(dataJournal,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
    }
}

exports.getBooksByAuthor=(req,res)=>{
    const {author}=req.params
    BookModel.getBooksByAuthor(author,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
}
exports.updateJournal=(req,res)=>{
    const dataJournal=req.body;
    const {id}=req.params;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
     Journal.updateJournal(id,dataJournal,(err,books)=>{
        if(err){
            res.send(err)
        }else{
            res.send(books)
        }
    })
    }
}

