const userDetails = require('../../models/userDetails.model');
const { signUpService } = require('../../services/signup/signup.service');
const { submitUserDetailsService } = require('../../services/signup/submitUserDetails.service');
const { verifyOtpService } = require('../../services/signup/verifyOtp.service');
exports.signUp = async (req, res) => {
    try {
        await signUpService(req, res);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        await verifyOtpService(req, res);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}


exports.submitUserDetails = async (req, res) => {
    try{
   await submitUserDetailsService(req, res);
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}