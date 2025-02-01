const express=require('express');
const router=express.Router();
const signUpController=require('../controllers/signup/signup.controller');
const loginController=require('../controllers/login/login.controller');
// user sign up flow routes
router.post('/signup',signUpController.signUp);
router.post('/verify-otp',signUpController.verifyOtp);
router.post('/submit-user-detail',signUpController.submitUserDetails);

// user login flow routes
router.post('/login',loginController.login);

module.exports=router;