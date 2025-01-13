const dbConn=require('../config/db_config');

const Purchase = (purcharse)=>{
    this.id_compra=purcharse.id_compra;
    this.admin_ci = purcharse.admin_ci;
    this.nomb_admin=purcharse.nomb_admin;
    this.rol=purcharse.rol;
    this.descripcion=purcharse.descripcion;
    this.fecha_compra = purcharse.fecha_compra;
}

const PurchaseDetails=(purchase)=>{
    this.id_compra=purchase.id_compra;
    this.id_compra_detalle=purchase.id_compra_detalle;
    this.id_libro=purchase.id_libro;
    this.libro=purchase.libro;
    this.cantidad=purchase.cantidad;
    this.precio_unitario=purchase.precio_unitario;
    this.subtotal=purchase.subtotal;
}


const PurchaseAllDetails=(purchase)=>{
    this.id_compra=purchase.id_compra;
    this.descripcion=purchase.descripcion;
    this.id_compra_detalle=purchase.id_compra_detalle;
    this.id_libro=purchase.id_libro;
    this.libro=purchase.libro;
    this.cantidad=purchase.cantidad;
    this.precio_unitario=purchase.precio_unitario;
    this.subtotal=purchase.subtotal;
}
const PurchaseWithDetails=(purchase)=>{
    this.id_admin=purchase.id_admin;
    this.descripcion=purchase.descripcion;
    this.fecha_compra=purchase.fecha_compra;
    this.id_libro=purchase.id_libro;
    this.cantidad_compra=purchase.cantidad_compra;
    this.precio_unitario=purchase.precio_unitario;
}

const PurchaseModel=(purchase)=>{
    this.id_admin=purchase.id_admin;
    this.descripcion=purchase.descripcion;
    this.fecha_compra=purchase.fecha_compra;
}

const PurchaseDetailsModel=(purchase)=>{
    this.id_compras=purchase.id_compras;
    this.id_libro=purchase.id_libro;
    this.cantidad_compra=purchase.cantidad_compra;
    this.precio_unitario=purchase.precio_unitario;
}

PurchaseAllDetails.getAllDetailsPurchases=(result)=>{
    dbConn.query("SELECT comp.id AS id_compra, comp.descripcion, id_compra_detalle,lib.id AS id_libro,lib.titulo AS libro,compd.cantidad_compra AS cantidad,compd.precio_unitario, compd.subtotal FROM libros AS lib INNER JOIN compra_detalle_libro AS compd ON lib.id=compd.id_libro INNER JOIN compras AS comp ON comp.id=compd.id_compras",
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
//get all Orders
Purchase.getAllPurchases=(result)=>{
    dbConn.query("SELECT comp.id AS id_compra, ad.ci_persona AS admin_ci, concat_ws(' ',pe.nombres,pe.apellidos) AS nomb_admin, ad.rol , comp.descripcion, comp.fecha_compra  FROM persona AS pe INNER JOIN admin AS ad ON pe.ci=ad.ci_persona INNER JOIN compras AS comp ON ad.id_admin=comp.id_admin ORDER BY ad.id_admin",
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
Purchase.getAllPurchasesFromAdmin=(id,result)=>{
    dbConn.query(`SELECT comp.id AS id_compra, ad.ci_persona AS admin_ci, concat_ws(' ',pe.nombres,pe.apellidos) AS nomb_admin, ad.rol , comp.descripcion, comp.fecha_compra  FROM persona AS pe INNER JOIN admin AS ad ON pe.ci=ad.ci_persona INNER JOIN compras AS comp ON ad.id_admin=comp.id_admin WHERE ad.id_admin=${id} ORDER BY comp.id`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
//Purcharse 

PurchaseDetails.getOnePurchase=(id,result)=>{
    dbConn.query(`SELECT comp.id AS id_compra,compd.id AS id_compra_detalle,compd.id_libro,lib.titulo AS libro,compd.cantidad_compra AS cantidad,compd.precio_unitario , compd.subtotal FROM libros AS lib INNER JOIN compra_detalle_libro AS compd ON lib.id=compd.id_libro INNER JOIN compras AS comp ON comp.id=compd.id_compras WHERE comp.id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

PurchaseWithDetails.addPurchase=(dataPurchase,size,result)=>{
    dbConn.query(`CALL new_purchase(${dataPurchase.id_admin},'${dataPurchase.descripcion}','${dataPurchase.fecha_compra}','${dataPurchase.id_libro}','${dataPurchase.cantidad_compra}','${dataPurchase.precio_unitario}',${size})`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            console.log("Compra con sus detalles registrado!");
            result(null,res);
        }
    })
}



PurchaseModel.updatePurchase=(id,dataPurchase,result)=>{
    dbConn.query(`UPDATE compras SET id_admin=?, descripcion=?, fecha_compra=? WHERE id=?`,[dataPurchase.id_admin,dataPurchase.descripcion,dataPurchase.fecha_compra,id],
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            console.log("Compra actualizada!");
            result(null,res);
        }
    })
}
PurchaseDetailsModel.updatePurchaseDetails=(id,dataPurchaseDetails,result)=>{
    const subtotal=parseInt(dataPurchaseDetails.cantidad_compra)*parseInt(dataPurchaseDetails.precio_unitario);
    dbConn.query(`UPDATE compra_detalle_libro SET id_compras=?, id_libro=?, cantidad_compra=?, precio_unitario=?, subtotal=? WHERE id=?`,[dataPurchaseDetails.id_compras,dataPurchaseDetails.id_libro,dataPurchaseDetails.cantidad_compra,dataPurchaseDetails.precio_unitario,subtotal,id],
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            console.log("Detalle de compra actualizada!");
            result(null,res);
        }
    })
}

PurchaseModel.removePurchase=(id,result)=>{
    dbConn.query(`DELETE FROM compras WHERE id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            console.log("Compra eliminada!");
            result(null,res);
        }
    })
}

PurchaseDetailsModel.removePurchaseDetail=(id,result)=>{
    dbConn.query(`DELETE FROM compra_detalle_libro WHERE id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            console.log("Detalle de compra eliminada!");
            result(null,res);
        }
    })
}

PurchaseModel.deletePurchase=(id,result)=>{
    dbConn.query(`CALL delete_purchase(${id})`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            console.log("Compra con sus detalles eliminados!");
            result(null,res);
        }
    })
}



module.exports.PurchaseModel=PurchaseModel;
module.exports.PurchaseDetailsModel=PurchaseDetailsModel;
module.exports.PurchaseWithDetails=PurchaseWithDetails;
module.exports.PurchaseAllDetails=PurchaseAllDetails;
module.exports.PurchaseDetails=PurchaseDetails;
module.exports.Purchase=Purchase;