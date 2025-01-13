export interface User{
    id:number;
    ci: string;
    nombres:string;
    apellidos:string;
    fec_nac:Date;
    num_telf:number;
    correo:string;
}

export interface UserData{
    ci: string;
    id:number;
    nombres:string;
    apellidos:string;
    fec_nac:Date;
    num_telf:number;
    correo:string;
    observacion:string;
    historial_prestamo:string;
}

export interface BannedUser{
    ci: string;
    id:number;
    nombres:string;
    apellidos:string;
    fec_nac:Date;
    num_telf:number;
    correo:string;
    razon_sancion:string;
    fecha_sancion:string;
    fecha_fin_sancion:string;
}
