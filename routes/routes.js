const express=require('express');
const router=express.Router();
const signUpController=require('../controllers/signup/signup.controller');
const loginController=require('../controllers/login/login.controller');
const authController=require('../controllers/auth/auth.controller');
const verifyToken = require('../middlewares/verifyToken');
// user sign up flow routes
router.post('/signup',signUpController.signUp);
router.post('/verify-otp',signUpController.verifyOtp);
router.post('/submit-user-detail',signUpController.submitUserDetails);

// user login flow routes
router.post('/login',loginController.login);

// user autherization flow routes
router.get('/verify-token',verifyToken,authController.verifyToken);

module.exports=router;