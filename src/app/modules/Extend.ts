export interface Extend{
    id:Number;
    id_devolucion:Number;
    fecha_entrega_anterior:Date;
    fecha_ampliacion:Date;
    fecha_limite_ampliacion:Date;

}
export interface ExtensionUserLib{
    id_ampliacion:number;
    id_devolucion:number;
    user_id:number;
    nomb_usuario:String;
    telefono:String;
    libro_prestado:String;
    fecha_prestamo_persona:Date;
    fecha_entrega_anterior:Date;
    fecha_ampliacion:Date;
    fecha_vencimiento_entrega:Date;
}