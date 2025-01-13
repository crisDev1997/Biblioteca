const express=require('express');
const router=express.Router();

const ExtensionController=require('../controllers/extension.controller');


router.get('/all_extensions',ExtensionController.getAllExtensionsList);
router.get('/extension/:id',ExtensionController.getExtension);
router.post('/add_extension',ExtensionController.addExtend);
router.put('/update_extension/:id',ExtensionController.updateExtend);
router.delete('/delete_extension/:id',ExtensionController.deleteExtend);
module.exports=router;