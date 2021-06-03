const dbConn=require('../config/db_config');

const Section = (section)=>{
    this.id_seccion=section.id;
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
            console.log('Las secciones se han pedido correctamente! ')
            result(null,res);
        }
    })
}

//get al Revistas

module.exports=Section