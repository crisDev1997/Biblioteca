const express=require('express');
const router=express.Router();

const OrderController=require('../controllers/order.controller');

// get all orders
router.get('/',OrderController.getAllOrderList);


module.exports=router;