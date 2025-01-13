const express=require('express');
const router=express.Router();

const PurchaseController=require('../controllers/purchase.controller');

router.get('/all',PurchaseController.getAllPurchaseList);
router.get('/all/admin/:id',PurchaseController.getAllPurchaseFromAdmin);
router.get('/purchase/:id',PurchaseController.getOnePurcharse);
router.get('/details/all',PurchaseController.getAllPurchaseDetailsList);
router.post('/add_purchase',PurchaseController.addNewPurchases);
router.put('/update_purchase/:id',PurchaseController.updatePurchase);
router.put('/update_detail/:id',PurchaseController.updateDetailPurchase);
router.delete('/delete_purchase/:id',PurchaseController.deletePurchase);
router.delete('/delete_detail/:id',PurchaseController.deleteDetail);

module.exports=router;