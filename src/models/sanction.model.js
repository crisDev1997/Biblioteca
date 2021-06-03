const dbConn=require('../config/db_config');

const Sanction = (sanction)=>{
    this.id_sancion=sanction.id_sancion;
    this.id_usuario=sanction.id_usuario;
    this.nombres = sanction.nombres;
    this.apellidos=sanction.apellidos;
    this.num_telf=sanction.num_telf;
    this.correo=sanction.correo;
    this.razon_sancion=sanction.razon_sancion;
    this.fecha_sancion=sanction.fecha_sancion;
    this.fecha_fin_sancion=sanction.fecha_fin_sancion;
 
}
//get all sanctions
Sanction.getAllSanctions=(result)=>{
    dbConn.query("SELECT sa.id AS id_sancion,u.id AS id_usuario, p.nombres , p.apellidos , p.num_telf , p.correo, sa.razon_sancion,sa.fecha_sancion, sa.fecha_fin_sancion  FROM persona AS p INNER JOIN usuario AS u ON p.ci=u.ci_persona INNER JOIN  sancion AS sa ON u.id = sa.id_usuario ORDER BY sa.fecha_sancion",
    (err,res)=>{
        if(err){
            console.log('Error while fetching sanctions ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}


module.exports=Sanction