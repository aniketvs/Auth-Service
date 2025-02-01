const { Sequelize } = require('sequelize');
const userDetails=require('../../models/userDetails.model');
const bcrypt=require('bcrypt');
const loginService=async (req, res) => {
    const { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).json({ message: 'User Id and Password are required' });
    }
    const user = await userDetails.findOne({
        where:{[Sequelize.Op.or]: [
            { email: userId },
            { number: userId }
        ]}
    });
    if (!user) {
        return res.status(400).json({ message: 'user not exits!' });
    }
    const match=await bcrypt.compare(password,user.dataValues.password);
    if (!match) {
        return res.status(400).json({ message: 'Invalid password' });
    }
   let userObj=user.dataValues;
    delete userObj.password;
    res.status(200).json({ message: 'Login success' ,data:userObj});

}

module.exports = loginService;