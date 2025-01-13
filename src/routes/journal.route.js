const express=require('express');
const router=express.Router();

const JournalController=require('../controllers/journal.controller');

// get all books
router.get('/all',JournalController.getAllJournalList);
router.get('/avaible',JournalController.getJournalsAvaibles);
router.get('/not_avaible',JournalController.getJournalsNotAvaibles);
router.get('/journal/:id',JournalController.getJournal);
router.post('/add_journal',JournalController.addJournal);
router.put('/update_journal/:id',JournalController.updateJournal);
router.delete('/remove_journal/:id',JournalController.deleteJournal);


module.exports=router;