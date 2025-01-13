const express=require('express');
const router=express.Router();
const OrderUserController=require('../controllers/orders_user.controller')


router.get('/all-users-orders',OrderUserController.getAllOrdersFromUsers)
router.get('/all-orders/:id',OrderUserController.getAllOrdersFromUser)
router.get('/verify-order/:id',OrderUserController.verifyConfirm);
router.post('/add-order',OrderUserController.addOrderFromUser);
router.put('/confirm-user-order/:id',OrderUserController.confirmOrder)
router.delete('/delete-order/:id',OrderUserController.deleteOrderFromUser);


module.exports=router;