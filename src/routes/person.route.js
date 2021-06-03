const express=require('express');
const router=express.Router();

const PersonController=require('../controllers/person.controller')
//get all users
router.get('/',PersonController.getAllPersonList);


module.exports=router