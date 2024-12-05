const express= require('express')
const UserController=require('../controllers/user.controller')
const router=express.Router()
const upload= require('../utils/upload')
router.put("/profile",upload.single('image'),UserController.editProfile)
module.exports=router