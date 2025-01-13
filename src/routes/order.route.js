const express=require('express');
const router=express.Router();

const OrderController=require('../controllers/order.controller');

router.get('/all',OrderController.getAllOrderList);
router.get('/order/:id',OrderController.getOneOrder);
router.get('/admin/:id_admin',OrderController.getOrdersByAdmin);
router.post('/add_order',OrderController.addOrder);
router.post('/add_prueba',OrderController.addPrueba);
router.put('/update_order/:id',OrderController.updateOrder);
router.delete('/delete_order/:id',OrderController.deleteOrder);

module.exports=router;