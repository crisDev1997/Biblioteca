const express=require('express');
const router=express.Router();

const JournalController=require('../controllers/journal.controller');

// get all books
router.get('/',JournalController.getAllJournalList);


module.exports=router;