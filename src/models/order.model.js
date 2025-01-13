const dbConn=require('../config/db_config');

const Order = (order)=>{
    this.id=order.id;
    this.id_libro=order.id_libro;
    this.id_admin=order.id_admin;
    this.pedido_solicitado_por = order.pedido_solicitado_por;
    this.rol=order.rol;
    this.lib_pedido=order.lib_pedido;
    this.cantidad_pedida=order.cantidad_pedida;
    this.fecha_pedido = order.fecha_pedido;
}
const OrderModel=(order)=>{
    this.id=order.id
    this.id_admin=order.id_admin;
    this.id_libro=order.id_libro;
    this.cantidad_pedida=order.cantidad_pedida;
    this.fecha_pedido=order.fecha_pedido;
}

//get all Orders
Order.getAllOrders=(result)=>{
    dbConn.query("Select ped.id,ped.id_libro,ad.id_admin, concat_ws(' ',pe.nombres,pe.apellidos) AS pedido_solicitado_por, ad.rol, lib.titulo AS lib_pedido ,ped.cantidad_pedida  , ped.fecha_pedido FROM persona AS pe INNER JOIN admin AS ad ON pe.ci=ad.ci_persona INNER JOIN pedidos AS ped ON ad.id_admin=ped.id_admin INNER JOIN libros AS lib ON ped.id_libro=lib.id ORDER BY ped.id",
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
Order.getOrder=(id,result)=>{
    dbConn.query(`Select ped.id,ped.id_libro,ad.id_admin, concat_ws(' ',pe.nombres,pe.apellidos) AS pedido_solicitado_por, ad.rol, lib.titulo AS lib_pedido ,ped.cantidad_pedida  , ped.fecha_pedido FROM persona AS pe INNER JOIN admin AS ad ON pe.ci=ad.ci_persona INNER JOIN pedidos AS ped ON ad.id_admin=ped.id_admin INNER JOIN libros AS lib ON ped.id_libro=lib.id WHERE ped.id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
Order.getOrdersByAdmin=(id_admin,result)=>{
    dbConn.query(`Select ped.id,ped.id_libro,ad.id_admin, concat_ws(' ',pe.nombres,pe.apellidos) AS pedido_solicitado_por, ad.rol, lib.titulo AS lib_pedido ,ped.cantidad_pedida  , ped.fecha_pedido FROM persona AS pe INNER JOIN admin AS ad ON pe.ci=ad.ci_persona INNER JOIN pedidos AS ped ON ad.id_admin=ped.id_admin INNER JOIN libros AS lib ON ped.id_libro=lib.id WHERE ped.id_admin=${id_admin}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

OrderModel.addOrder=(dataOrder,result)=>{
    dbConn.query("INSERT INTO pedidos SET ?",dataOrder,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            console.log("Pedido registrado!");
            result(null,res);
        }
    })
}
OrderModel.updateOrder=(id,dataOrder,result)=>{
    dbConn.query(`UPDATE pedidos SET id_admin=${dataOrder.id_admin}, id_libro=${dataOrder.id_libro}, cantidad_pedida=${dataOrder.cantidad_pedida}, fecha_pedido='${dataOrder.fecha_pedido}' WHERE id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            console.log("Pedido actualizado!");
            result(null,res);
        }
    })
}
OrderModel.removeOrder=(id,result)=>{
    dbConn.query(`DELETE FROM pedidos WHERE id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            console.log("Pedido eliminado!");
            result(null,res);
        }
    })
}

module.exports.OrderModel=OrderModel;
module.exports.Order=Order