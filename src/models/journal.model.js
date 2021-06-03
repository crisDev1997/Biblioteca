const dbConn=require('../config/db_config');
const Journal=(journal)=>{
    this.id=journal.id;
    this.titulo=journal.titulo;
    this.titular=journal.titukar;
    this.num_volumen=journal.num_volumen;
    this.num_revista=journal.num_revista;
    this.fecha_publicacion=journal.fecha_publicacion;
    this.cantidad=journal.cantidad;
    this.cantidad_disponible=journal.cantidad_disponible;
    this.link_pdf_ref=journal.link_pdf_ref;

}

//get all journals
Journal.getAllJournals=(result)=>{
    dbConn.query("SELECT rev.id ,lib.titulo ,rev.titular , rev.num_volumen, rev.num_revista, rev.fecha_publicacion, rev.cantidad, rev.cantidad_disponible, rev.link_pdf_ref FROM libros AS lib INNER JOIN revista AS rev ON lib.id=rev.id_libro ",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            console.log('Los libros se han pedido correctamente! ')
            result(null,res);
        }
    })
}


module.exports=Journal