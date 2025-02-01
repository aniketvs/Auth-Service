const userDetails = require('../../models/userDetails.model');
const { signUpService } = require('../../services/signup/signup.service');
exports.signUp = async (req, res) => {
    try {
        await signUpService(req, res);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}