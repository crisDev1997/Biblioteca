export interface LoanUser{
    id:Number;
    id_usuario:Number;
    id_libro:Number;
    ci:string;
    nombres:string;
    apellidos:string;
    num_telf:string;
    titulo:string;
    fecha_prestamo_persona:Date;
    fecha_vencimiento_entrega:Date;
    status_devolucion:number;
    fecha_pp:String;
    fecha_ve:String;
}
export interface Loan{
    id:Number;
    id_usuario:Number;
    id_libro:Number;
    fecha_prestamo_persona:Date;
    fecha_vencimiento_entrega:Date;
    status_devolucion:number;
}
export interface LoanExtended{
    id:Number;
    id_ampliacion:Number;
    id_usuario:Number;
    ci:String;
    nombres:String;
    apellidos:String;
    num_telf:String;
    titulo:String;
    fecha_prestamo_persona:Date;
    fecha_entrega_anterior:Date;
    fecha_ampliacion:Date;
    fecha_vencimiento_entrega:Date;
    status_devolucion:Number;
}