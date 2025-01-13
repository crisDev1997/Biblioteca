export interface OrderUserModel{
    id:Number;
    id_usuario:Number;
    nombre_libro:String;
    cantidad_pedida:Number;
    fecha_pedido:Date;
    confirm:Boolean;
}
export interface OrderUser{
    id:Number;
    id_usuario:Number;
    pedido_solicitado_por:String;
    nombre_libro:String;
    cantidad_pedida:Number;
    fecha_pedido:Date;
    confirm:Number;
}