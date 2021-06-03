const express=require('express');
const router=express.Router()
const AuthController=require('../../controllers/auth.controller')

//Login de administrador:
router.get('/login',AuthController.getLogin);
router.post('/auth',AuthController.postAuth);
router.post('/login',AuthController.postLogin);

module.exports=router