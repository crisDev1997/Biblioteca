const express=require('express');
const router=express.Router();

const DevolutionController=require('../controllers/devolution.controller');

router.get('/all',DevolutionController.getAllDevolutionsList);
router.get('/:id',DevolutionController.getDevolution);
router.get('/pending',DevolutionController.getAllPendingDevolutionsList);
router.get('/extended',DevolutionController.getAllExtendedDevolutionsList);
router.get('/pending/not_returned',DevolutionController.getAllDevolutionsNotReturnedList);
router.post('/create_devolution',DevolutionController.createNewDevolution);
router.put('/update_devolution/:id',DevolutionController.updateDevolution);
router.delete('/delete_devolution/:id',DevolutionController.deleteDevolution);
module.exports=router;