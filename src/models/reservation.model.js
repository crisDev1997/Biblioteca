const dbConn=require('../config/db_config');

const Reservation = (reservation)=>{
    this.id=reservation.id;
    this.id_usuario=reservation.id_usuario;
    this.ci_usuario = reservation.ci_usuario;
    this.nomb_usuario=reservation.nomb_usuario;
    this.lib_reserv=reservation.lib_reserv;
    this.num_telf=reservation.num_telf;
    this.fecha_reserva=reservation.fecha_reserva;
    this.fecha_limite_reserva = reservation.fecha_limite_reserva;
}


//get all Reservations
Reservation.getAllReservations=(result)=>{
    dbConn.query("SELECT res.id ,u.id AS id_usuario,u.ci_persona AS ci_usuario, concat_ws(' ',pe.nombres,pe.apellidos) AS nomb_usuario, lib.titulo AS lib_reserv, pe.num_telf, res.fecha_reserva, res.fecha_limite_reserva  FROM persona AS pe INNER JOIN usuario AS u ON pe.ci=u.ci_persona INNER JOIN reservaciones AS res ON u.id=res.id_usuario INNER JOIN libros AS lib ON res.id_libro=lib.id ORDER BY res.id",
    (err,res)=>{
        if(err){
            console.log('Error while fetching Reservations ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}


module.exports=Reservation