const express=require('express');
const router=express.Router();

const ExtensionController=require('../controllers/extension.controller');

//get all devolutions
router.get('/',ExtensionController.getAllExtensionsList);

module.exports=router;