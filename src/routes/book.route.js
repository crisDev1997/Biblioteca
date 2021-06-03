const express=require('express');
const router=express.Router();


const BookController=require('../controllers/book.controller');

// get all books
router.get('/all',BookController.getAllbookList);
router.get('/avaible',BookController.getAllAvaibleBookList);
router.get('/not_avaible',BookController.getNotAvaibleBookList);
router.get('/registered_not_avaible',BookController.getRegisteredBooksNotAvaibleList);
router.put('/add_more/:id',BookController.addMoreBooks);
router.post('/add_book',BookController.addBook);
router.put('/update_book/:id',BookController.updateBook);
router.delete('/delete_book/:id',BookController.deleteBook);
module.exports=router;