export interface Reservation {
    id:Number;
    id_usuario:Number;
    id_libro:Number;
    ci_usuario:String;
    nomb_usuario:String;
    lib_reserv:String;
    num_telf:String;
    fecha_reserva:Date;
    fecha_limite_reserva:Date;
}

export interface ReservationModel{
    id_libro:Number;
    id_usuario:Number;
    fecha_reserva:Date;
    fecha_limite_reserva:Date;
}