const express=require('express');
const router=express.Router();
const signUpController=require('../controllers/signup/signup.controller');
router.post('/signup',signUpController.signUp);
router.post('/verify-otp',signUpController.verifyOtp);
router.post('/submit-user-detail',signUpController.submitUserDetails);
module.exports=router;