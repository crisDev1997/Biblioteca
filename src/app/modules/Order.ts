export interface Order{
    id:Number;
    id_libro:Number;
    id_admin:Number;
    pedido_solicitado_por:String;
    rol:String;
    lib_pedido:String;
    cantidad_pedida:Number;
    fecha_pedido:Date;
}
export interface OrderModel{
    id:Number;
    id_admin:Number;
    id_libro:Number;
    cantidad_pedida:Number;
    fecha_pedido:Date;
}