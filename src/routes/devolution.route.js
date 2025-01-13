const express=require('express');
const router=express.Router();

const DevolutionController=require('../controllers/devolution.controller');

router.get('/all',DevolutionController.getAllDevolutionsList);
router.get('/devolution/:id',DevolutionController.getDevolution);
router.get('/returned',DevolutionController.getAllDevolutionsReturned);
router.get('/pending',DevolutionController.getAllPendingDevolutionsList);
router.get('/expired',DevolutionController.getAllDevolutionsExpiredList);
router.get('/extended',DevolutionController.getAllExtendedDevolutionsList);
router.get('/pending/not_returned',DevolutionController.getAllDevolutionsExpiredList);
router.get('/devolutions/user/:id',DevolutionController.getAllDevolutionsFromUser);
router.post('/create_devolution',DevolutionController.createNewDevolution);
router.put('/update_devolution/:id',DevolutionController.updateDevolution);
router.put('/update_state_devolution/:idAndState',DevolutionController.updateStateDevolution);
router.delete('/delete_devolution/:id',DevolutionController.deleteDevolution);
module.exports=router;