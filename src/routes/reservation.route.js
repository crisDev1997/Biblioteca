const express=require('express');
const router=express.Router();

const ReservationController=require('../controllers/reservation.controller');

// get all orders
router.get('/',ReservationController.getAllReservationList);


module.exports=router;