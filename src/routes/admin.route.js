const express=require('express');
const router=express.Router();

const AdminController=require('../controllers/admin.controller')


router.get('/',AdminController.getAllAdminList);
router.post('/add_admin',AdminController.addAdmin);

module.exports=router