export interface Purchase{
    id_compra:Number;
    admin_ci:String;
    nomb_admin:String;
    rol:String;
    descripcion:String;
    fecha_compra:Date;
}

export interface PurchaseDetails{
    id_compra:Number;
    id_compra_detalle:Number;
    id_libro:Number;
    libro:String;
    cantidad:Number;
    precio_unitario:Number;
    subtotal:Number;
}


export interface PurchaseAllDetails{
    id_compra:Number;
    descripcion:String;
    id_compra_detalle:Number;
    id_libro:Number;
    libro:String;
    cantidad:Number;
    precio_unitario:Number;
    subtotal:Number;
}
export interface PurchaseWithDetails{
    id_admin:Number;
    descripcion:String;
    fecha_compra:Date;
    id_libro:Number;
    cantidad_compra:Number;
    precio_unitario:Number;
}

export interface PurchaseModel{
    id_admin:Number;
    descripcion:String;
    fecha_compra:Date;
}

export interface PurchaseDetailsModel{
    id_compras:Number;
    id_libro:Number;
    cantidad_compra:Number;
    precio_unitario:Number;
}