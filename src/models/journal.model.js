const dbConn=require('../config/db_config');
const Journal=(journal)=>{
    this.id=journal.id;
    this.id_rev=journal.id;
    this.titulo=journal.titulo;
    this.titular=journal.titukar;
    this.num_volumen=journal.num_volumen;
    this.num_revista=journal.num_revista;
    this.fecha_publicacion=journal.fecha_publicacion;
    this.cantidad=journal.cantidad;
    this.cantidad_disponible=journal.cantidad_disponible;
    this.link_pdf_ref=journal.link_pdf_ref;

}

const JournalModel=(journal)=>{
    this.id=journal.id;
    this.titulo=journal.titulo;
    this.titular=journal.titular;
    this.num_volumen=journal.num_volumen;
    this.num_revista=journal.num_revista;
    this.fecha_publicacion=journal.fecha_publicacion;
    this.cantidad=journal.cantidad;
    this.disponibles=journal.disponibles;
    this.link_pdf_ref=journal.link_pdf_ref;
}


Journal.getAllJournals=(result)=>{
    dbConn.query("SELECT lib.id,rev.id  AS id_rev ,lib.titulo ,rev.titular , rev.num_volumen, rev.num_revista, rev.fecha_publicacion, lib.cantidad, lib.disponibles AS cantidad_disponible, lib.link_pdf_ref FROM libros AS lib INNER JOIN revista AS rev ON lib.id=rev.id_libro ORDER BY lib.titulo",
    (err,res)=>{
        if(err){
       
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}

Journal.getJounalsAvaible=(result)=>{
    dbConn.query("SELECT lib.id,rev.id AS id_rev ,lib.titulo ,rev.titular , rev.num_volumen, rev.num_revista, rev.fecha_publicacion, lib.cantidad, lib.disponibles AS cantidad_disponible, lib.link_pdf_ref FROM libros AS lib INNER JOIN revista AS rev ON lib.id=rev.id_libro WHERE lib.cantidad>0 AND lib.disponibles>0 ORDER BY lib.titulo",
    (err,res)=>{
        if(err){
           
            result(null,err);
        }else{
           
            result(null,res);
        }
    })
}

Journal.getJounalsNotAvaible=(result)=>{
    dbConn.query("SELECT lib.id,rev.id AS id_rev,lib.titulo ,rev.titular , rev.num_volumen, rev.num_revista, rev.fecha_publicacion, lib.cantidad, lib.disponibles AS cantidad_disponible, lib.link_pdf_ref FROM libros AS lib INNER JOIN revista AS rev ON lib.id=rev.id_libro WHERE lib.cantidad<=0 OR lib.disponibles<=0 ORDER BY lib.titulo",
    (err,res)=>{
        if(err){
            
            result(null,err);
        }else{
           
            result(null,res);
        }
    })
}

Journal.getJournal=(id,result)=>{
    dbConn.query(`SELECT lib.id,rev.id AS id_rev,lib.titulo ,rev.titular , rev.num_volumen, rev.num_revista, rev.fecha_publicacion, lib.cantidad, lib.disponibles AS cantidad_disponible, lib.link_pdf_ref FROM libros AS lib INNER JOIN revista AS rev ON lib.id=rev.id_libro WHERE lib.id=${id}`,
    (err,res)=>{
        if(err){
            
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}


Journal.getAllJournalsFromAMagazine=(id, result)=>{
    dbConn.query(`SELECT rev.id ,lib.titulo ,rev.titular , rev.num_volumen, rev.num_revista, rev.fecha_publicacion, rev.cantidad, rev.cantidad_disponible, rev.link_pdf_ref FROM libros AS lib INNER JOIN revista AS rev ON lib.id=rev.id_libro WHERE rev.id_libro=${id} ORDER BY rev.fecha_publicacion`,
    (err,res)=>{
        if(err){
           
            result(null,err);
        }else{
           
            result(null,res);
        }
    })
}

JournalModel.addJournal=(dataJournal,result)=>{
    dbConn.query(`CALL new_journal('${dataJournal.titulo}',${dataJournal.cantidad},'${dataJournal.link_pdf_ref}','${dataJournal.titular}',${dataJournal.num_volumen},${dataJournal.num_revista},'${dataJournal.fecha_publicacion}')`,
    (err,res)=>{
        if(err){
           
            result(null,err);
        }else{
            console.log("La revista se ha registrado correctamente!")
            result(null,res);
        }
    })
}

JournalModel.updateJournal=(id,dataJournal,result)=>{
    dbConn.query(`CALL update_journal('${dataJournal.titulo}',${dataJournal.cantidad},${dataJournal.disponibles},'${dataJournal.link_pdf_ref}','${dataJournal.titular}',${dataJournal.num_volumen},${dataJournal.num_revista},'${dataJournal.fecha_publicacion}',${id})`,
    (err,res)=>{
        if(err){
         
            result(null,err);
        }else{
            console.log('La revista se ha actualizado correctamente! ')
            result(null,res);
        }
    })
}


JournalModel.deleteJournal=(id,result)=>{
    dbConn.query(`CALL delete_journal(${id})`,
    (err,res)=>{
        if(err){
            
            result(null,err);
        }else{
            console.log('La revista se ha eliminado correctamente ')
            result(null,res);
        }
    })
}


module.exports.JournalModel=JournalModel
module.exports.Journal=Journal