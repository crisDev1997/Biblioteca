const dbConn=require('../config/db_config');

const Section = (section)=>{
    this.id_seccion=section.id;
    this.nombre_seccion = section.nombre_seccion;
    this.num_seccion=section.num_seccion;
    this.tags=section.tags;
 
}

const SectionInsertUpdate=section=>{
    this.nombre_seccion = section.nombre_seccion;
    this.num_seccion=section.num_seccion;
    this.tags=section.tags;
}


const SectionBooks=(section)=>{
    this.id_seccion=section.id;
    this.id_libro=section.id_libro;
    this.libro=section.libro;
    this.genero=section.genero;
    this.cantidad=section.cantidad;
    this.disponibles=section.disponibles;
    this.nombre_seccion = section.nombre_seccion;
    this.num_seccion=section.num_seccion;
    this.tags=section.tags;
}

//get all sections
Section.getAllSections=(result)=>{
    dbConn.query("SELECT id_seccion ,nombre_seccion ,num_seccion ,tags  FROM seccion ORDER BY id_seccion",
    (err,res)=>{
        if(err){
            console.log('Error while fetching sections ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}

Section.getSection=(id,result)=>{
    dbConn.query(`SELECT id_seccion ,nombre_seccion ,num_seccion ,tags  FROM seccion WHERE id_seccion=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching sections ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}
SectionBooks.getBooksFromASectionName=(name,result)=>{
    dbConn.query(`SELECT sec.id_seccion, lib.id AS id_libro, lib.titulo AS libro,lib.genero, lib.cantidad, lib.disponibles, sec.nombre_seccion, sec.num_seccion, sec.tags FROM seccion AS sec INNER JOIN libros AS lib ON sec.id_seccion=lib.id_seccion WHERE sec.nombre_seccion='${name}'`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching sections ',err);
            result(null,err);
        }else{
         
            result(null,res);
        }
    })
}
SectionBooks.getBooksFromASectionId=(id,result)=>{
    dbConn.query(`SELECT sec.id_seccion, lib.id AS id_libro, lib.titulo AS libro,lib.genero, lib.cantidad, lib.disponibles, sec.nombre_seccion, sec.num_seccion, sec.tags FROM seccion AS sec INNER JOIN libros AS lib ON sec.id_seccion=lib.id_seccion WHERE sec.id_seccion=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching sections ',err);
            result(null,err);
        }else{
          
            result(null,res);
        }
    })
}
SectionBooks.getBooksFromASectionNumber=(numSection,result)=>{
    dbConn.query(`SELECT sec.id_seccion, lib.id AS id_libro, lib.titulo AS libro,lib.genero, lib.cantidad, lib.disponibles, sec.nombre_seccion, sec.num_seccion, sec.tags FROM seccion AS sec INNER JOIN libros AS lib ON sec.id_seccion=lib.id_seccion WHERE sec.num_seccion=${numSection}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching sections ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}

SectionBooks.getBooksFromASectionTag=(tag,result)=>{
    dbConn.query(`SELECT sec.id_seccion, lib.id AS id_libro, lib.titulo AS libro,lib.genero, lib.cantidad, lib.disponibles, sec.nombre_seccion, sec.num_seccion, sec.tags FROM seccion AS sec INNER JOIN libros AS lib ON sec.id_seccion=lib.id_seccion WHERE sec.tags LIKE '%${tag}%'`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching sections ',err);
            result(null,err);
        }else{
          
            result(null,res);
        }
    })
}

SectionInsertUpdate.addNewSection=(dataSection,result)=>{
    dbConn.query(`INSERT INTO seccion(nombre_seccion,num_seccion,tags) VALUES(${dataSection.nombre_seccion},${dataSection.num_seccion},${dataSection.tags})`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching sections ',err);
            result(null,err);
        }else{
            console.log("Seccion Registrada!");
            result(null,res);
        }
    })
}
SectionInsertUpdate.updateSection=(id,dataSection,result)=>{
    dbConn.query(`UPDATE seccion SET nombre_seccion=${dataSection.nombre_seccion}, num_seccion=${dataSection.num_seccion}, tags=${dataSection.tags} WHERE id_seccion=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching sections ',err);
            result(null,err);
        }else{
            console.log("Seccion Actualizada!");
            result(null,res);   
        }
    })
}

SectionInsertUpdate.addMoreTags=(id,newTag,result)=>{
    dbConn.query(`UPDATE seccion SET tags=concat_ws('. ',tags,'${newTag}') WHERE id_seccion=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching sections ',err);
            result(null,err);
        }else{
            console.log("Agregacion de tags a seccion exitosa!");
            result(null,res);
        }
    })
}
Section.removeSection=(id,result)=>{
    dbConn.query(`DELETE FROM seccion WHERE id_seccion=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching sections ',err);
            result(null,err);
        }else{
            console.log("Seccion eliminada");
            result(null,res);
        }
    })
}
module.exports.SectionInsertUpdate=SectionInsertUpdate;
module.exports.SectionBooks=SectionBooks;
module.exports.Section=Section;