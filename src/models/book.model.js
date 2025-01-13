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

const Journal=(book)=>{
    this.titulo=book.titulo;
    this.link_pdf_ref=book.link_pdf_ref;
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

BookSection.getAllBooks=(result)=>{
    dbConn.query("SELECT lib.id, lib.titulo, lib.autor, lib.genero, sec.nombre_seccion , sec.num_seccion, lib.cantidad , lib.disponibles, lib.link_pdf_ref FROM libros AS lib LEFT OUTER JOIN seccion AS sec ON lib.id_seccion=sec.id_seccion WHERE lib.genero!='Revista' ORDER BY lib.titulo",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}
BookModel.getBooksByAuthor=(author,result)=>{
    dbConn.query(`SELECT * FROM libros WHERE autor LIKE '%${author}%'`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

BookModel.getBook=(id,result)=>{
    dbConn.query(`SELECT * FROM libros WHERE id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

BookSection.getAllBooksByGenre=(genero,result)=>{
    dbConn.query(`SELECT lib.id AS id_libro, lib.titulo , lib.autor , lib.genero, sec.nombre_seccion AS Seccion, sec.num_seccion , lib.cantidad , lib.disponibles , lib.link_pdf_ref  FROM libros AS lib LEFT OUTER JOIN seccion AS sec ON lib.id_seccion=sec.id_seccion WHERE lib.genero LIKE '%${genero}%' ORDER BY lib.id `,
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

BookSection.getAllBooksFromASection=(section,result)=>{
    dbConn.query(`SELECT lib.id AS id_libro, lib.titulo , lib.autor , lib.genero, sec.nombre_seccion AS Seccion, sec.num_seccion , lib.cantidad , lib.disponibles  FROM libros AS lib LEFT OUTER JOIN seccion AS sec ON lib.id_seccion=sec.id_seccion WHERE sec.id_seccion=${section} ORDER BY lib.id `,
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
BookSection.getAllAvaibleBooks=(result)=>{
    dbConn.query("SELECT lib.id, lib.titulo, lib.autor, lib.genero, sec.nombre_seccion , sec.num_seccion, lib.cantidad , lib.disponibles , lib.link_pdf_ref  FROM libros AS lib LEFT OUTER JOIN seccion AS sec ON lib.id_seccion=sec.id_seccion WHERE lib.cantidad>0 and lib.disponibles>0 and lib.genero!='Revista' ORDER BY lib.titulo",
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
    dbConn.query("SELECT lib.id, lib.titulo, lib.autor, lib.genero, sec.nombre_seccion , sec.num_seccion, lib.cantidad , lib.disponibles, lib.link_pdf_ref  FROM libros AS lib LEFT OUTER JOIN seccion AS sec ON lib.id_seccion=sec.id_seccion WHERE (lib.cantidad=0 OR lib.disponibles=0) and lib.genero!='Revista' ORDER BY lib.titulo",
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
    dbConn.query(`INSERT INTO libros(titulo,autor,genero,id_seccion,cantidad,disponibles,link_pdf_ref) VALUES('${dataBook.titulo}','${dataBook.autor}','${dataBook.genero}',${dataBook.id_seccion},${dataBook.cantidad},${dataBook.cantidad},'${dataBook.link_pdf_ref}')`,(err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            console.log("Libro registrado!");
            result(null,res);
        }
    })
}
BookModel.updateBook=(dataBook,id,result)=>{
    dbConn.query("UPDATE libros SET titulo=?, autor=?, genero=?, id_seccion=?, cantidad=? , disponibles=?, link_pdf_ref=? WHERE id=?",[dataBook.titulo,dataBook.autor,dataBook.genero,dataBook.id_seccion,dataBook.cantidad,dataBook.disponibles,dataBook.link_pdf_ref,id],(err,res)=>{
        if(err){

            result(null,err)
        }else{
            console.log("Libro actualizado");
            result(null,res);
        }
    })
}
BookModel.deleteBook=(id,result)=>{
    dbConn.query(`DELETE FROM libros WHERE id=${id}`, (err,res)=>{
        if(err){
        
            result(null,err);
        }else{
            console.log("Libro eliminado");
            result(null,res);
        }
    })
}


Journal.newJournal=(dataJournal,result)=>{
    dbConn.query(`INSERT INTO libros(titulo,autor,genero,id_seccion,cantidad,disponibles,link_pdf_ref) VALUES('${dataJournal.titulo}','','Revista',${null},2,2,'${dataJournal.link_pdf_ref}')`, (err,res)=>{
        if(err){
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

Journal.updateJournal=(id,dataJournal,result)=>{
    dbConn.query(`UPDATE libros SET titulo='${dataJournal.titulo}', link_pdf_ref='${dataJournal.link_pdf_ref}' WHERE id=${id}`,(err,res)=>{
        if(err){
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
module.exports.Journal=Journal;
module.exports.BookModel=BookModel;
module.exports.Book=Book;
module.exports.BookSection=BookSection;