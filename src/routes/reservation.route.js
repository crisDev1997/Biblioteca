const express=require('express');
const router=express.Router();

const ReservationController=require('../controllers/reservation.controller');

router.get('/reservation/all',ReservationController.getAllReservationList);
router.get('/reservation/reserv/:id',ReservationController.getOneReservation);
router.post('/add_reservation',ReservationController.addReservation);
router.put('/update_reservation/:id',ReservationController.updateReservation);
router.delete('/delete_reservation/:id',ReservationController.deleteReservation);
router.get('/all_expired',ReservationController.getAllExpiredReservations);
router.get('/user/reservations/:id',ReservationController.getAllReservationsFromAUser);


module.exports=router;