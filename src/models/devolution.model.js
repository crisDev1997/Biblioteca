const dbConn=require('../config/db_config');

const Devolution=(devolution)=>{
    this.id=devolution.id,
    this.user_id=devolution.id,
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
DevolutionModel.createNewDevolution=(devolutionData,result)=>{
    dbConn.query(`INSERT INTO devoluciones SET ?`,devolutionData,
    (err,res)=>{
        if(err){
            console.log('Error while fetching devolutions ',err);
            result(null,err);
        }else{
            
            result(null,res);
        }
    })
}
//get data from a devolution
Devolution.getDevolution=(id,result)=>{
    dbConn.query(`SELECT de.id,u.id ,p.ci,p.nombres,p.apellidos, p.num_telf,lib.titulo,de.fecha_prestamo_persona,de.fecha_vencimiento_entrega, de.status_devolucion FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id WHERE de.id=${id}`,
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
    dbConn.query("SELECT de.id,u.id ,p.ci,p.nombres,p.apellidos, p.num_telf,lib.titulo,de.fecha_prestamo_persona,de.fecha_vencimiento_entrega, de.status_devolucion FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id ORDER BY de.id ",
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
    this.id_devolucion=devolution.id_devolucion,
    this.id_usuario=devolution.id_usuario,
    this.nomb_completo=devolution.nomb_completo,
    this.telefono=devolution.telefono,
    this.lib_prestado=devolution.lib_prestado,
    this.fecha_prestado=devolution.fecha_prestado,
    this.fecha_retorno=devolution.fecha_retorno,
    this.status_devolucion=devolution.status_devolucion
}
DevolutionPending.getAllPendingDevolutions=(result)=>{
    dbConn.query("SELECT de.id AS id_devolucion,u.id AS id_usuario,p.ci,concat_ws(' ',p.nombres , p.apellidos ) AS nomb_completo , p.num_telf AS telefono,lib.titulo as lib_prestado ,de.fecha_prestamo_persona AS fecha_prestado,de.fecha_vencimiento_entrega AS fecha_Retorno, de.status_devolucion  FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id WHERE de.status_devolucion!=2 and de.fecha_vencimiento_entrega>date(NOW()) ORDER BY de.fecha_vencimiento_entrega",
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
    dbConn.query("SELECT de.id AS id_devolucion,u.id AS id_usuario,p.ci,concat_ws(' ',p.nombres , p.apellidos ) AS nomb_completo , p.num_telf AS telefono,lib.titulo as lib_prestado ,de.fecha_prestamo_persona AS fecha_prestado,de.fecha_vencimiento_entrega AS fecha_Retorno, de.status_devolucion  FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id WHERE de.status_devolucion!=2 and de.fecha_vencimiento_entrega<date(NOW()) ORDER BY de.fecha_vencimiento_entrega",
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
    this.id_devolucion=devolution.id_devolucion,
    this.ci=devolution.ci,
    this.nomb_completo=devolution.nomb_completo,
    this.telefono=devolution.telefono,
    this.lib_prestado=devolution.lib_prestado,
    this.fecha_prestado=devolution.fecha_prestado,
    this.fecha_entrega_anterior=devolution.fecha_entrega_anterior,
    this.fecha_nueva_entrega=devolution.fecha_nueva_entrega

}
DevolutionAmplied.getAllAmpliedDevolutions=(result)=>{
    dbConn.query("SELECT de.id AS id_devolucion,p.ci, concat_ws(' ',p.nombres , p.apellidos ) AS nomb_completo, p.num_telf AS telefono,lib.titulo AS lib_prestado ,de.fecha_prestamo_persona AS fecha_prestado,amp.fecha_entrega_anterior ,amp.fecha_ampliacion  ,de.fecha_vencimiento_entrega AS fecha_nueva_entrega FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id INNER JOIN ampliacion AS amp ON de.id = amp.id_devolucion ORDER BY de.fecha_vencimiento_entrega ",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
            
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