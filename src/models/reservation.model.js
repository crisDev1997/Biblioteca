const dbConn=require('../config/db_config');

const Reservation = (reservation)=>{
    this.id=reservation.id;
    this.id_usuario=reservation.id_usuario;
    this.id_libro=reservation.id_libro;
    this.ci_usuario = reservation.ci_usuario;
    this.nomb_usuario=reservation.nomb_usuario;
    this.lib_reserv=reservation.lib_reserv;
    this.num_telf=reservation.num_telf;
    this.fecha_reserva=reservation.fecha_reserva;
    this.fecha_limite_reserva = reservation.fecha_limite_reserva;
}

const ReservationModel=(reservation)=>{
    this.id_libro=reservation.id_libro;
    this.id_usuario=reservation.id_usuario;
    this.fecha_reserva=reservation.fecha_reserva;
    this.fecha_limite_reserva=reservation.fecha_limite_reserva;
}
//get all Reservations
Reservation.getAllReservations=(result)=>{
    dbConn.query("SELECT res.id ,u.id AS id_usuario,res.id_libro,u.ci_persona AS ci_usuario, concat_ws(' ',pe.nombres,pe.apellidos) AS nomb_usuario, lib.titulo AS lib_reserv, pe.num_telf, res.fecha_reserva, res.fecha_limite_reserva  FROM persona AS pe INNER JOIN usuario AS u ON pe.ci=u.ci_persona INNER JOIN reservaciones AS res ON u.id=res.id_usuario INNER JOIN libros AS lib ON res.id_libro=lib.id ORDER BY u.id",
    (err,res)=>{
        if(err){
            console.log('Error while fetching Reservations ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

Reservation.getAllReservationsFromAUser=(id,result)=>{
    dbConn.query(`SELECT res.id ,u.id AS id_usuario,res.id_libro,u.ci_persona AS ci_usuario, concat_ws(' ',pe.nombres,pe.apellidos) AS nomb_usuario, lib.titulo AS lib_reserv, pe.num_telf, res.fecha_reserva, res.fecha_limite_reserva  FROM persona AS pe INNER JOIN usuario AS u ON pe.ci=u.ci_persona INNER JOIN reservaciones AS res ON u.id=res.id_usuario INNER JOIN libros AS lib ON res.id_libro=lib.id WHERE u.id=${id} ORDER BY res.id`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Reservations ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
Reservation.getAllExpiredReservations=(result)=>{
    dbConn.query(`SELECT res.id ,u.id AS id_usuario,res.id_libro,u.ci_persona AS ci_usuario, concat_ws(' ',pe.nombres,pe.apellidos) AS nomb_usuario, lib.titulo AS lib_reserv, pe.num_telf, res.fecha_reserva, res.fecha_limite_reserva  FROM persona AS pe INNER JOIN usuario AS u ON pe.ci=u.ci_persona INNER JOIN reservaciones AS res ON u.id=res.id_usuario INNER JOIN libros AS lib ON res.id_libro=lib.id WHERE res.fecha_limite_reserva<date(NOW()) ORDER BY res.id`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Reservations ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}
Reservation.getReservation=(id,result)=>{
    dbConn.query(`SELECT res.id ,u.id AS id_usuario,res.id_libro,u.ci_persona AS ci_usuario, concat_ws(' ',pe.nombres,pe.apellidos) AS nomb_usuario, lib.titulo AS lib_reserv, pe.num_telf, res.fecha_reserva, res.fecha_limite_reserva  FROM persona AS pe INNER JOIN usuario AS u ON pe.ci=u.ci_persona INNER JOIN reservaciones AS res ON u.id=res.id_usuario INNER JOIN libros AS lib ON res.id_libro=lib.id WHERE res.id=${id} ORDER BY res.id`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Reservations ',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

ReservationModel.addNewReservation=(dataReservation,result)=>{
    dbConn.query("INSERT INTO reservaciones SET ?",dataReservation,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Reservations ',err);
            result(null,err);
        }else{
            console.log("Reservacion de usuario registrado!");
            result(null,res);
        }
    })
}
ReservationModel.updateReservation=(id,dataReser,result)=>{
    dbConn.query(`UPDATE reservaciones SET id_libro=${dataReser.id_libro}, id_usuario=${dataReser.id_usuario}, fecha_reserva=${dataReser.fecha_reserva}, fecha_limite_reserva=${dataReser.fecha_limite_reserva} WHERE id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Reservations ',err);
            result(null,err);
        }else{
            console.log("Reservacion actualizada!");
            result(null,res);
        }
    })
}
ReservationModel.removeReservation=(id,result)=>{
    dbConn.query(`DELETE FROM reservaciones WHERE id=${id}`,
    (err,res)=>{
        if(err){
            console.log('Error while fetching Reservations ',err);
            result(null,err);
        }else{
            console.log("Reservacion eliminada!");
            result(null,res);
        }
    })
}

module.exports.ReservationModel=ReservationModel;
module.exports.Reservation=Reservation;