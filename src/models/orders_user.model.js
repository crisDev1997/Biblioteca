const dbConn=require('../config/db_config'); 
const dbConn2=require('../config/db_config2');
const OrderUserModel=(order_user)=>{
    this.id=order_user.id
    this.id_usuario=order_user.id_usuario;
    this.nombre_libro=order_user.nombre_libro;
    this.cantidad_pedida=order_user.cantidad_pedida;
    this.fecha_pedido=order_user.fecha_pedido;
    this.confirm=order_user.confirm;
}
const OrderUser = (order_user)=>{
    this.id=order_user.id;
    this.id_usuario=order_user.id_admin;
    this.pedido_solicitado_por=order_user.pedido_solicitado_por;
    this.nombre_libro=order_user.nombre_libro;
    this.cantidad_pedida=order_user.cantidad_pedida;
    this.fecha_pedido = order_user.fecha_pedido;
    this.confirm=order_user.confirm;
}
OrderUser.getOrdersFromUser=(id_usuario,result)=>{
    dbConn.query(`Select ped.id,u.id AS id_usuario, concat_ws(' ',pe.nombres,pe.apellidos) AS pedido_solicitado_por,ped.nombre_libro, ped.cantidad_pedida  , ped.fecha_pedido,ped.confirm FROM persona AS pe INNER JOIN usuario AS u ON pe.ci=u.ci_persona INNER JOIN pedidos_usuario AS ped ON u.id=ped.id_usuario WHERE ped.id_usuario=${id_usuario}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
OrderUserModel.verifyConfirm=(id)=>{
    return dbConn2.execute(`Select * FROM pedidos_usuario WHERE confirm>0 AND id=${id}`)
}
OrderUserModel.confirmOrder=(id)=>{
    return dbConn2.execute(`UPDATE pedidos_usuario SET confirm=1 WHERE id=${id}`)
}

OrderUser.getAllOrdersFromUsers=(result)=>{
    dbConn.query(`Select ped.id,u.id AS id_usuario, concat_ws(' ',pe.nombres,pe.apellidos) AS pedido_solicitado_por,ped.nombre_libro, ped.cantidad_pedida  , ped.fecha_pedido,ped.confirm FROM persona AS pe INNER JOIN usuario AS u ON pe.ci=u.ci_persona INNER JOIN pedidos_usuario AS ped ON u.id=ped.id_usuario ORDER BY u.id`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
OrderUserModel.addOrderFromUser=(dataOrder,result)=>{
    dbConn.query(`INSERT INTO pedidos_usuario(id_usuario,nombre_libro,cantidad_pedida,fecha_pedido) VALUES(${dataOrder.id_usuario},'${dataOrder.nombre_libro}',${dataOrder.cantidad_pedida},'${dataOrder.fecha_pedido}')`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            console.log("Pedido de un usuario registrado!");
            result(null,res);
        }
    })
}
OrderUserModel.deleteOrder=(id,result)=>{
    dbConn.query(`DELETE FROM pedidos_usuario WHERE id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Orders ',err);
            result(null,err);
        }else{
            console.log("Pedido  de usuario eliminado!");
            result(null,res);
        }
    })
}
module.exports.OrderUserModel=OrderUserModel;
module.exports.OrderUser=OrderUser;