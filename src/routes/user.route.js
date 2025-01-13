const express=require('express');
const router=express.Router();

const UserController=require('../controllers/user.controller')

router.get('/all',UserController.getAllUserList);
router.get('/banned',UserController.getBannedUsers);
router.get('/allowed',UserController.getAllowUsers);
router.get('/username/:name',UserController.getUserByName);
router.get('/user/:ci',UserController.getUser);
router.get('/user/id/:id',UserController.getUserById)
router.get('/ban/user/:id',UserController.getBan);
router.post('/add_user',UserController.createNewUser);
router.put('/update_user/:ci',UserController.updateUser);
router.delete('/delete_user/:ci',UserController.deleteUser);


module.exports=router