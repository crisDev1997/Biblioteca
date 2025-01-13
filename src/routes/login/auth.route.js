const express=require('express');
const router=express.Router()
const AuthController=require('../../controllers/auth.controller')

router.post('/auth/login',AuthController.postAuth);

router.post('/auth/user/login',AuthController.userPostLogin);
router.post('/auth/user/new-user-account',AuthController.createUserAccount);
router.get('/auth/user/data/:correo',AuthController.getUserDataByEmail)
router.get('/auth/user/verify-email-not-registered/:correo',AuthController.verifyNotDuplicatedEmailRegister);
module.exports=router