const dbConn=require('../config/db_config');
const SanctionModel=(sanction)=>{
    this.id_usuario=sanction.id_usuario;
    this.id_devolucion=sanction.id_devolucion;
    this.razon_sancion=sanction.razon_sancion;
    this.fecha_sancion=sanction.fecha_sancion;
    this.fecha_fin_sancion=sanction.fecha_fin_sancion;
}
const Sanction = (sanction)=>{
    this.id=sanction.id;
    this.id_usuario=sanction.id_usuario;
    this.id_devolucion=sanction.id_devolucion;
    this.ci=sanction.ci;
    this.nombres = sanction.nombres;
    this.apellidos=sanction.apellidos;
    this.num_telf=sanction.num_telf;
    this.correo=sanction.correo;
    this.razon_sancion=sanction.razon_sancion;
    this.fecha_sancion=sanction.fecha_sancion;
    this.fecha_fin_sancion=sanction.fecha_fin_sancion;
 
}

const SanctionWithDevolution=(sanction)=>{
    this.id_sancion=sanction.id_sancion;
    this.id_usuario=sanction.id_usuario;
    this.nombres = sanction.nombres;
    this.apellidos=sanction.apellidos;
    this.num_telf=sanction.num_telf;
    this.correo=sanction.correo;
    this.id_devolucion=sanction.id_devolucion;
    this.libro_no_devuelto=sanction.libro_no_devuelto;
    this.razon_sancion=sanction.razon_sancion;
    this.fecha_sancion=sanction.fecha_sancion;
    this.fecha_fin_sancion=sanction.fecha_fin_sancion;   
}
//get all sanctions
Sanction.getAllSanctions=(result)=>{
    dbConn.query("SELECT sa.id,u.id AS id_usuario,sa.id_devolucion,p.ci, p.nombres , p.apellidos , p.num_telf , p.correo, sa.razon_sancion,sa.fecha_sancion, sa.fecha_fin_sancion  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona INNER JOIN  sancion AS sa ON u.id = sa.id_usuario ORDER BY sa.fecha_sancion",
    (err,res)=>{
        if(err){
            console.log('Error while fetching sanctions ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
Sanction.getSanction=(ci,result)=>{
    dbConn.query(`SELECT sa.id,u.id AS id_usuario,sa.id_devolucion,p.ci, p.nombres , p.apellidos , p.num_telf , p.correo, sa.razon_sancion,sa.fecha_sancion, sa.fecha_fin_sancion  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona INNER JOIN  sancion AS sa ON u.id = sa.id_usuario WHERE u.ci_persona=${ci}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching sanctions ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    }
    )
}
Sanction.getSanctionById=(id,result)=>{
    console.log("id: ",id)
    dbConn.query(`SELECT sa.id,u.id AS id_usuario,sa.id_devolucion,p.ci, p.nombres , p.apellidos , p.num_telf , p.correo, sa.razon_sancion,sa.fecha_sancion, sa.fecha_fin_sancion  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona INNER JOIN  sancion AS sa ON u.id = sa.id_usuario WHERE sa.id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching sanctions ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    }
    )
}
Sanction.getUsersNotReturn=(result)=>{
    dbConn.query("SELECT sa.id , u.id AS id_usuario,sa.id_devolucion ,p.ci, p.nombres , p.apellidos , p.num_telf , p.correo, sa.razon_sancion,sa.fecha_sancion, sa.fecha_fin_sancion FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona INNER JOIN  sancion AS sa ON u.id = sa.id_usuario INNER JOIN  devoluciones AS de ON sa.id_devolucion = de.id INNER JOIN libros AS lib ON de.id_libro=lib.id WHERE sa.id_devolucion>0",
    (err,res)=>{
        if(err){
            console.log('Error while fetching sanctions ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

Sanction.getUsersBookReturned=(result)=>{
    dbConn.query("SELECT sa.id,u.id AS id_usuario,sa.id_devolucion,p.ci, p.nombres , p.apellidos , p.num_telf, p.correo,sa.razon_sancion ,sa.fecha_sancion ,sa.fecha_fin_sancion  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona INNER JOIN  sancion AS sa ON u.id = sa.id_usuario WHERE id_devolucion=0 ORDER BY sa.fecha_sancion",
    (err,res)=>{
        if(err){
            console.log('Error while fetching sanctions ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

SanctionModel.addUser=(dataSanction,result)=>{
    if(dataSanction.fecha_fin_sancion==null){
    dbConn.query(`INSERT INTO sancion(id_usuario,id_devolucion,razon_sancion,fecha_sancion,fecha_fin_sancion) VALUES(${dataSanction.id_usuario},${dataSanction.id_devolucion},'${dataSanction.razon_sancion}','${dataSanction.fecha_sancion}',${dataSanction.fecha_fin_sancion})`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching sanctions ',err);
            result(null,err);
        }else{
            console.log("Usuario Sancionado!");
            result(null,res);
        }
    })
    }else{
        dbConn.query(`INSERT INTO sancion(id_usuario,id_devolucion,razon_sancion,fecha_sancion,fecha_fin_sancion) VALUES(${dataSanction.id_usuario},${dataSanction.id_devolucion},'${dataSanction.razon_sancion}','${dataSanction.fecha_sancion}','${dataSanction.fecha_fin_sancion}')`,
        (err,res)=>{
            if(err){
                console.log('Error while fetching sanctions ',err);
                result(null,err);
            }else{
                console.log("Usuario Sancionado!");
                result(null,res);
            }
        })   
    }
}
SanctionModel.updateSanction=(id,dataSanction,result)=>{
    dbConn.query("UPDATE sancion SET id_usuario=?, id_devolucion=?, razon_sancion=?, fecha_sancion=?, fecha_fin_sancion=? WHERE id=?",[dataSanction.id_usuario,dataSanction.id_devolucion,dataSanction.razon_sancion,dataSanction.fecha_sancion,dataSanction.fecha_fin_sancion,id],
    (err,res)=>{
        if(err){
            console.log('Error while fetching sanctions ',err);
            result(null,err);
        }else{
            console.log("Sancion actualizada!");
            result(null,res);
        }
    })
}

SanctionModel.deleteSanction=(id,result)=>{
    dbConn.query(`DELETE FROM sancion WHERE id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching sanctions ',err);
            result(null,err);
        }else{
            console.log('Sancion eliminada')
            result(null,res);
        }
    })
}

module.exports.SanctionModel=SanctionModel;
module.exports.SanctionWithDevolution=SanctionWithDevolution
module.exports.Sanction=Sanction