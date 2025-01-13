const dbConn=require('../config/db_config');

const Devolution=(devolution)=>{
    this.id=devolution.id,
    this.id_usuario=devolution.id_usuario,
    this.id_libro=devolution.id_libro,
    this.ci=devolution.ci,
    this.nombres=devolution.nombres,
    this.apellidos=devolution.apellidos,
    this.num_telf=devolution.num_telf,
    this.titulo=devolution.titulo,
    this.fecha_prestamo_persona=devolution.fecha_prestamo_persona,
    this.fecha_vencimiento_entrega=devolution.fecha_vencimiento_entrega,
    this.status_devolucion=devolution.status_devolucion
}

const DevolutionModel=function(devolution){
    this.id=devolution.id,
    this.id_usuario=devolution.id_usuario,
    this.id_libro=devolution.id_libro,
    this.fecha_prestamo_persona=devolution.fecha_prestamo_persona,
    this.fecha_vencimiento_entrega=devolution.fecha_vencimiento_entrega,
    this.status_devolucion=devolution.status_devolucion
}

Devolution.getAllDevolutionsFromUser=(id,result)=>{
    dbConn.query(`SELECT de.id,u.id AS id_usuario,lib.id AS id_libro ,p.ci,p.nombres,p.apellidos, p.num_telf,lib.titulo,de.fecha_prestamo_persona,de.fecha_vencimiento_entrega, de.status_devolucion FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id WHERE u.id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

DevolutionModel.createNewDevolution=(devolutionData,result)=>{
    dbConn.query(`INSERT INTO devoluciones(id_usuario,id_libro,fecha_prestamo_persona,fecha_vencimiento_entrega,status_devolucion) VALUES(${devolutionData.id_usuario},${devolutionData.id_libro},date(NOW()),'${devolutionData.fecha_vencimiento_entrega}',1)`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching devolutions ',err);
            result(null,err);
        }else{
            console.log("Prestamo registrado!");
            result(null,res);
        }
    })
}
//get data from a devolution
Devolution.getDevolution=(id,result)=>{
    dbConn.query(`SELECT de.id,u.id AS id_usuario,lib.id AS id_libro ,p.ci,p.nombres,p.apellidos, p.num_telf,lib.titulo,de.fecha_prestamo_persona,de.fecha_vencimiento_entrega, de.status_devolucion FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id WHERE de.id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })

}
//get all devolutions
Devolution.getAllDevolutions=(result)=>{
    dbConn.query("SELECT de.id,u.id AS id_usuario,lib.id AS id_libro,p.ci,p.nombres,p.apellidos, p.num_telf,lib.titulo,de.fecha_prestamo_persona,de.fecha_vencimiento_entrega, de.status_devolucion FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id ORDER BY de.fecha_vencimiento_entrega  ",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}

Devolution.getAllDevolutionsReturned=(result)=>{
    dbConn.query("SELECT de.id,u.id AS id_usuario,lib.id AS id_libro,p.ci,p.nombres,p.apellidos, p.num_telf,lib.titulo,de.fecha_prestamo_persona,de.fecha_vencimiento_entrega, de.status_devolucion FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id WHERE de.status_devolucion=2 ORDER BY de.fecha_vencimiento_entrega  ",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}

Devolution.getAllDevolutionsExpired=(result)=>{
    dbConn.query("SELECT de.id,u.id AS id_usuario,lib.id AS id_libro,p.ci,p.nombres,p.apellidos, p.num_telf,lib.titulo,de.fecha_prestamo_persona,de.fecha_vencimiento_entrega, de.status_devolucion FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id WHERE de.fecha_vencimiento_entrega<date(NOW()) and de.status_devolucion=1 ORDER BY de.fecha_vencimiento_entrega  ",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}



const DevolutionPending=(devolution)=>{
    this.id=devolution.id,
    this.id_usuario=devolution.id_usuario,
    this.ci=devolution.ci,
    this.nombres=devolution.nombres,
    this.apellidos=devolution.apellidos,
    this.num_telf=devolution.num_telf,
    this.titulo=devolution.titulo,
    this.fecha_prestamo_persona=devolution.fecha_prestamo_persona,
    this.fecha_vencimiento_entrega=devolution.fecha_vencimiento_entrega,
    this.status_devolucion=devolution.status_devolucion
}
DevolutionPending.getAllPendingDevolutions=(result)=>{
    dbConn.query("SELECT de.id,u.id AS id_usuario,p.ci,p.nombres,p.apellidos, p.num_telf,lib.titulo,de.fecha_prestamo_persona,de.fecha_vencimiento_entrega, de.status_devolucion  FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id WHERE de.status_devolucion=1 and de.fecha_vencimiento_entrega>date(NOW()) ORDER BY de.fecha_vencimiento_entrega ",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}
DevolutionPending.getAllDevolutionsNotReturned=(result)=>{
    dbConn.query("SELECT de.id,u.id AS id_usuario,p.ci,p.nombres,p.apellidos, p.num_telf,lib.titulo,de.fecha_prestamo_persona,de.fecha_vencimiento_entrega, de.status_devolucion  FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id WHERE de.status_devolucion!=2 and de.fecha_vencimiento_entrega<date(NOW()) ORDER BY de.fecha_vencimiento_entrega ",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}

const DevolutionAmplied=(devolution)=>{
    this.id=devolution.id,
    this.id_ampliacion=devolution.id_ampliacion;
    this.id_usuario=devolution.id_usuario,
    this.ci=devolution.ci,
    this.nombres=devolution.nombres,
    this.apellidos=devolution.apellidos,
    this.num_telf=devolution.num_telf,
    this.titulo=devolution.titulo,
    this.fecha_prestamo_persona=devolution.fecha_prestamo_persona,
    this.fecha_entrega_anterior=devolution.fecha_entrega_anterior,
    this.fecha_ampliacion=devolution.fecha_ampliacion,
    this.fecha_vencimiento_entrega=devolution.fecha_vencimiento_entrega,
    this.status_devolucion=devolution.status_devolucion
    
}
DevolutionAmplied.getAllAmpliedDevolutions=(result)=>{
    dbConn.query("SELECT de.id,amp.id AS id_ampliacion,u.id AS id_usuario ,p.ci, p.nombres,p.apellidos ,p.num_telf,lib.titulo,de.fecha_prestamo_persona ,amp.fecha_entrega_anterior ,amp.fecha_ampliacion  ,de.fecha_vencimiento_entrega,de.status_devolucion FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id INNER JOIN ampliacion AS amp ON de.id = amp.id_devolucion ORDER BY de.fecha_vencimiento_entrega ",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}

DevolutionModel.updateStateDevolution=(id,state_devolution,result)=>{
    dbConn.query("UPDATE devoluciones SET status_devolucion=? WHERE id=?",[state_devolution,id],(err,res)=>{
        if(err){
            console.log('Error mientras se actualizaba la devolucion');
            result(null,err)
        }else{
            console.log("Estado de Devolucion actualizada!");
            result(null,res);
        }
    })

}

DevolutionModel.updateDevolution=(id,devolutionData,result)=>{
    dbConn.query("UPDATE devoluciones SET id_usuario=? ,id_libro=?, fecha_prestamo_persona=?, fecha_vencimiento_entrega=?,status_devolucion=? WHERE id=?",[devolutionData.id_usuario,devolutionData.id_libro,devolutionData.fecha_prestamo_persona,devolutionData.fecha_vencimiento_entrega,devolutionData.status_devolucion,id],(err,res)=>{
        if(err){
            console.log('Error mientras se actualizaba la devolucion');
            result(null,err)
        }else{
            console.log("Devolucion actualizada");
            result(null,res);
        }
    })

}
DevolutionModel.deleteDevolution=(id,result)=>{
    dbConn.query(`DELETE FROM devoluciones WHERE id=${id}`,(err,res)=>{
        if(err){
            console.log('Error mientras se eliminaba la devolucion');
            result(null,err)
        }else{
            console.log("Devolucion eliminada");
            result(null,res);
        }
    })
}
module.exports.DevolutionModel=DevolutionModel; 
module.exports.Devolution=Devolution;
module.exports.DevolutionPending=DevolutionPending;
module.exports.DevolutionAmplied=DevolutionAmplied;