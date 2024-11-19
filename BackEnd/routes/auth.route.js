const express= require('express')
const authController= require('../controllers/auth.controller')
const { protectRoute } = require('../middleware/protectRoute')
const router=express.Router()
router.post('/signup',authController.signup)
router.post('/login',authController.login)
router.post('/logout',authController.logout)
router.get('/authCheck',protectRoute,authController.authCheck)
router.get('/google',authController.googleAuth)
router.get('/google/callback',authController.googleAuthCallBack,authController.googleAuthCallBackNext)
module.exports=router