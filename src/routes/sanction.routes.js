const express=require('express');
const router=express.Router();

const SanctionController=require('../controllers/sanction.controller')
//get all sections
router.get('/',SanctionController.getAllSanctionList);

module.exports=router