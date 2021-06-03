const express=require('express');
const router=express.Router();

const PurcharseController=require('../controllers/purcharse.controller');

// get all orders
router.get('/',PurcharseController.getAllPurcharseList);


module.exports=router;