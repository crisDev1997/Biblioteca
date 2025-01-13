const express=require('express');
const router=express.Router();

const BookRecordController=require('../controllers/book_records.controller');

router.get('/',BookRecordController.getAllBookRecordsList);


module.exports=router;