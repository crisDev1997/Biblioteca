const express=require('express');
const router=express.Router();

const SectionController=require('../controllers/section.controller')
//get all sections
router.get('/',SectionController.getAllSectionList);

module.exports=router