const express=require('express');
const router=express.Router();

const SectionController=require('../controllers/section.controller')
router.get('/all',SectionController.getAllSectionList);
router.get('/name/:name',SectionController.getBooksFromSectionName);
router.get('/section/:id',SectionController.getSection);
router.get('/number/:num',SectionController.getBooksFromSectionNumber);
router.get('/id/:id',SectionController.getBooksFromSectionId);
router.get('/tag/:tag',SectionController.getBooksFromSectionTag);
router.post('/add_section',SectionController.addNewSection);
router.put('/update_section/:id',SectionController.updateSection);
router.put('/update_section/add_more_tags/:id',SectionController.addMoreTag);
router.delete('/remove/:id',SectionController.deleteSection);
module.exports=router