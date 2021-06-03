const ReservationModel=require('../models/reservation.model');
// get all orders list
exports.getAllReservationList=(req,res)=>{
     ReservationModel.getAllReservations((err,reservations)=>{
        console.log('We are here')
        if(err){
            res.send(err)
        }else{
            res.send(reservations)
        }
    })
}