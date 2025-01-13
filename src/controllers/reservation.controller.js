const {Reservation,ReservationModel}=require('../models/reservation.model');
// get all orders list
exports.getAllReservationList=(req,res)=>{
     Reservation.getAllReservations((err,reservations)=>{
        if(err){
            res.send(err)
        }else{
            res.send(reservations)
        }
    })
}

exports.getAllExpiredReservations=(req,res)=>{
    Reservation.getAllExpiredReservations((err,reservations)=>{
        if(err){
            res.send(err)
        }else{
            res.send(reservations)
        }
    })
}

exports.getAllReservationsFromAUser=(req,res)=>{
    Reservation.getAllReservationsFromAUser(req.params.id,(err,reservations)=>{
        if(err){
            res.send(err)
        }else{
            res.send(reservations)
        }
    })
}
exports.getOneReservation=(req,res)=>{
    const {id}=req.params
    Reservation.getReservation(id,(err,reservations)=>{
        if(err){
            res.send(err)
        }else{
            res.send(reservations)
        }
    })
}

exports.addReservation=(req,res)=>{
    const dataReser=req.body;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
        ReservationModel.addNewReservation(dataReser,(err,reservations)=>{
        if(err){
            res.send(err)
        }else{
            res.send(reservations)
        }
    })
    }
}
exports.updateReservation=(req,res)=>{
    const {id}=req.params;
    const dataReser=req.body;
    if(req.body.constructor===Object && Object.keys(req.body).length===0){
        res.status(400).send({success:false, message:"Llena todos los campos"});
    }else{
        ReservationModel.updateReservation(id,dataReser,(err,reservations)=>{
        if(err){
            res.send(err)
        }else{
            res.send(reservations)
        }
    })
    }
}
exports.deleteReservation=(req,res)=>{
    const {id}=req.params;
    ReservationModel.removeReservation(id,(err,reservation)=>{
        if(err){
            res.send(err)
        }else{
            res.send(reservation)
        }
    })
}