const express=require('express');
const router=express.Router();


const BookController=require('../controllers/book.controller');

router.get('/all',BookController.getAllbookList);
router.get('/book/:id',BookController.getBook);
router.get('/avaible',BookController.getAllAvaibleBookList);
router.get('/not_avaible',BookController.getNotAvaibleBookList);
router.get('/registered_not_avaible',BookController.getRegisteredBooksNotAvaibleList);
router.get('/section/:id',BookController.getBooksFromSection);
router.get('/genre/:genre',BookController.getBooksByGenre);
router.get('/author/:author',BookController.getBooksByAuthor);
router.put('/add_more/:idAndState',BookController.addMoreBooks);
router.post('/add_book',BookController.addBook);
router.post('/add_journal',BookController.addNewJournal);
router.put('/update_book/:id',BookController.updateBook);
router.put('/update_journal/:id',BookController.updateJournal);
router.delete('/delete_book/:id',BookController.deleteBook);
module.exports=router;