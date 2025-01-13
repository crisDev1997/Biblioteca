export interface Sanction{
    id:number;
    id_usuario:number;
    id_devolucion:number;
    razon_sancion:string;
    fecha_sancion:Date;
    fecha_fin_sancion:Date;
}
export interface SanctionUser{
    id:number;  
    id_usuario:number;
    id_devolucion:number;
    ci:string;
    nombres:string;
    apellidos:string;
    num_telf:string;
    correo:string;
    razon_sancion:string;
    fecha_sancion:Date;
    fecha_fin_sancion:Date;
 
}