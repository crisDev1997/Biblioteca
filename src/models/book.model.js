const dbConn=require('../config/db_config');

const BookModel=function(book){
    this.id=book.id;
    this.titulo = book.titulo;
    this.autor=book.autor;
    this.genero=book.genero;
    this.id_seccion=book_id_seccion;
    this.cantidad = book.cantidad;
    this.disponibles= book.disponibles;
    this.link_pdf_ref=book.link_pdf_ref;
}


const Book = (book)=>{
    this.id=book.id;
    this.titulo = book.titulo;
    this.autor=book.autor;
    this.genero=book.genero;
    this.id_seccion=book.id_seccion;
    this.cantidad = book.cantidad;
    this.disponibles= book.disponibles;
    this.link_pdf_ref=book.link_pdf_ref;
}


//get all books
Book.getAllBooks=(result)=>{
    dbConn.query("SELECT *  FROM libros WHERE libros.genero!='Revista'",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
const BookSection=(book)=>{
    this.id_libro=book.id_libro;
    this.titulo = book.titulo;
    this.autor=book.autor;
    this.genero=book.genero;
    this.nombre_seccion=book.nombre_seccion;
    this.num_seccion=book.num_seccion;
    this.id_seccion=book.id_seccion;
    this.cantidad = book.cantidad;
    this.disponibles= book.disponibles;
    this.link_pdf_ref=book.link_pdf_ref;
}
BookSection.getAllAvaibleBooks=(result)=>{
    dbConn.query("SELECT lib.id AS id_libro, lib.titulo , lib.autor , lib.genero, sec.nombre_seccion AS Seccion, sec.num_seccion , lib.cantidad , lib.disponibles  FROM libros AS lib LEFT OUTER JOIN seccion AS sec ON lib.id_seccion=sec.id_seccion WHERE lib.cantidad>0 and lib.disponibles>0 and lib.genero!='Revista' ORDER BY lib.id",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

BookSection.getNotAvaibleBooks=(result)=>{
    dbConn.query("SELECT lib.id AS id_libro, lib.titulo, lib.autor, lib.genero, sec.nombre_seccion , sec.num_seccion, lib.cantidad , lib.disponibles FROM libros AS lib LEFT OUTER JOIN seccion AS sec ON lib.id_seccion=sec.id_seccion WHERE lib.cantidad>0 and lib.disponibles=0 and lib.genero!='Revista' ORDER BY lib.id",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

BookSection.getRegisteredBooksNotAvaible=(result)=>{
    dbConn.query("SELECT lib.id AS id_libro, lib.titulo , lib.autor , lib.genero , sec.nombre_seccion , sec.num_seccion , lib.cantidad , lib.disponibles FROM libros AS lib LEFT OUTER JOIN seccion AS sec ON lib.id_seccion=sec.id_seccion WHERE lib.cantidad=0 and lib.genero!='Revista' ORDER BY lib.id",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

BookModel.addMoreBooks=(id,quantity,result)=>{
    dbConn.query(`UPDATE libros SET cantidad=cantidad+${quantity}, disponibles=disponibles+${quantity} WHERE id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while adding more books ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

BookModel.addBook=(dataBook,result)=>{
    dbConn.query(`INSERT INTO libros SET ?`,dataBook, (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
BookModel.updateBook=(dataBook,id,result)=>{
    dbConn.query("UPDATE libros SET id=? ,titulo=?, autor=?, genero=?, id_seccion=?, cantidad=? , disponibles=?, link_pdf_ref=? WHERE id=?",[dataBook.id,dataBook.titulo,dataBook.autor,dataBook.genero,dataBook.id_seccion,dataBook.cantidad,dataBook.disponibles,dataBook.link_pdf_ref,id],(err,res)=>{
        if(err){
            console.log('Error mientras se actualizaba el libro');
            result(null,err)
        }else{
            console.log("Devolucion actualizada");
            result(null,res);
        }
    })
}
BookModel.deleteBook=(id,result)=>{
    dbConn.query(`DELETE FROM libros WHERE id=${id}`, (err,res)=>{
        if(err){
            console.log('Error mientras se borraba el libro ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

module.exports.BookModel=BookModel;
module.exports.Book=Book;
module.exports.BookSection=BookSection;