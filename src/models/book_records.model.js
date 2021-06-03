const dbConn=require('../config/db_config');

const Book_record = (book_record)=>{
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
Book_record.getAllBooks_records=(result)=>{
    dbConn.query("SELECT lib.id AS id_libro,lib.titulo ,lib.autor , lib.genero , pres.cantidad_veces_prestado , pres.ultimo_prestamo  FROM libros AS lib INNER JOIN registro_prestados AS pres ON lib.id=pres.id_libro ORDER BY lib.id",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books records ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}


module.exports=Book_record