const dbConn=require('../config/db_config');

const Order = (order)=>{
    this.id_pedido=order.id_pedido;
    this.pedido_solicitado_por = order.pedido_solicitado_por;
    this.rol=order.rol;
    this.lib_pedido=order.lib_pedido;
    this.cantidad_pedida=order.cantidad_pedida;
    this.fecha_pedido = order.fecha_pedido;
}


//get all Orders
Order.getAllOrders=(result)=>{
    dbConn.query("Select ped.id AS id_pedido, concat_ws(' ',pe.nombres,pe.apellidos) AS pedido_solicitado_por, ad.rol, lib.titulo AS lib_pedido ,ped.cantidad_pedida  , ped.fecha_pedido FROM persona AS pe INNER JOIN admin AS ad ON pe.ci=ad.ci_persona INNER JOIN pedidos AS ped ON ad.id_admin=ped.id_admin INNER JOIN libros AS lib ON ped.id_libro=lib.id ORDER BY ped.id",
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}


module.exports=Order