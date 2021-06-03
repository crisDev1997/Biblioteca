const dbConn=require('../config/db_config');

const Extension=(extension)=>{
    this.id_ampliacion=extension.id_ampliacion;
    this.id_devolucion=extension.id_devolucion;
    this.user_id=extension.id;
    this.nomb_usuario=extension.nomb_usuario;
    this.telefono=extension.telefono;
    this.libro_prestado=extension.libro_prestado;
    this.fecha_prestamo_persona=extension.fecha_prestamo_persona;
    this.fecha_entrega_anterior=extension.fecha_entrega_anterior;
    this.fecha_ampliacion=extension.fecha_ampliacion;
    this.fecha_vencimiento_entrega=extension.fecha_vencimiento_entrega;
}

//get all devolutions
Extension.getAllExtensions=(result)=>{
    dbConn.query("SELECT amp.id AS id_ampliacion ,de.id AS id_devolucion,u.id AS user_id, concat_ws(' ',p.nombres , p.apellidos ) AS nomb_usuario, p.num_telf AS telefono,lib.titulo AS libro_prestado ,de.fecha_prestamo_persona, amp.fecha_entrega_anterior ,amp.fecha_ampliacion ,de.fecha_vencimiento_entrega  FROM persona AS p INNER JOIN usuario AS u ON p.ci = u.ci_persona INNER JOIN devoluciones AS de ON u.id = de.id_usuario INNER JOIN libros AS lib ON de.id_libro=lib.id INNER JOIN ampliacion AS amp ON de.id = amp.id_devolucion",
    (err,res)=>{
        if(err){
            console.log('Error while fetching books ',err);
            result(null,err);
        }else{
        
            result(null,res);
        }
    })
}

module.exports=Extension