const express=require('express');
const router=express.Router();

const AdminController=require('../controllers/admin.controller')
//get all admins
router.get('/',AdminController.getAllAdminList);

module.exports=router