const loginService = require("../../services/login/login.service");

exports.login =async (req, res) => {
    try {
        await loginService(req, res);
      } catch (error) {  
        console.log('Error in login controller', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};