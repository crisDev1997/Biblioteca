const express=require('express');
const router=express.Router();

const UserController=require('../controllers/user.controller')
//get all users
router.get('/all',UserController.getAllUserList);
router.get('/banned',UserController.getBannedUsers);
router.get('/allowed',UserController.getAllowUsers);
router.get('/:id',UserController.getUser);
router.post('/create_user',UserController.createNewUser);
router.put('/update_user/:ci',UserController.updateUser);
router.delete('/delete_user/:ci',UserController.deleteUser);


module.exports=router