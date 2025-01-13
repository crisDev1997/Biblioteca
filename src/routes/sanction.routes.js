const express=require('express');
const router=express.Router();

const SanctionController=require('../controllers/sanction.controller')

router.get('/all',SanctionController.getAllSanctionList);
router.get('/sanction/:ci',SanctionController.getSanctionByUserCI);
router.get('/sanction_id/:id',SanctionController.getSanctionByIdBan);
router.get('/users/not_return',SanctionController.getSanctionsWithDevolution);
router.get('/users/returned',SanctionController.getSanctionsBookReturned);
router.post('/add_sanction',SanctionController.addSanction);
router.put('/update_sanction/:id',SanctionController.updateSanction);
router.delete('/delete_sanction/:id',SanctionController.deleteSanction);

module.exports=router