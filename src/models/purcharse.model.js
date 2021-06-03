const dbConn=require('../config/db_config');

const Purcharse = (purcharse)=>{
    this.id_compra=purcharse.id_compra;
    this.admin_ci = purcharse.admin_ci;
    this.nomb_admin=purcharse.nomb_admin;
    this.rol=purcharse.rol;
    this.descripcion=purcharse.descripcion;
    this.fecha_compra = purcharse.fecha_compra;
}


//get all Orders
Purcharse.getAllOrders=(result)=>{
    dbConn.query("SELECT comp.id AS id_compra, ad.ci_persona AS admin_ci, concat_ws(' ',pe.nombres,pe.apellidos) AS nomb_admin, ad.rol , comp.descripcion, comp.fecha_compra  FROM persona AS pe INNER JOIN admin AS ad ON pe.ci=ad.ci_persona INNER JOIN compras AS comp ON ad.id_admin=comp.id_admin ORDER BY comp.id",
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
Purcharse.getOnePucharse=(result)=>{
    dbConn.query("")
}


module.exports=Purcharse