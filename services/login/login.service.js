const { Sequelize } = require('sequelize');
const userDetails = require('../../models/userDetails.model');
const userSession = require('../../models/userSession.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginService = async (req, res) => {
    const { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).json({ message: 'User Id and Password are required' });
    }
    const user = await userDetails.findOne({
        where: {
            [Sequelize.Op.or]: [
                { email: userId },
                { number: userId }
            ]
        }
    });
    if (!user) {
        return res.status(400).json({ message: 'user not exits!' });
    }
    const match = await bcrypt.compare(password, user.dataValues.password);
    if (!match) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    let userObj = user.dataValues;
    delete userObj.password;
    const token = await jwt.sign({ userObj }, process.env.JWT_SECRET, { expiresIn: '7000h' });
    userObj.token = token;
    const currentSession = await userSession.findOne({ where: { user_id: userObj.id } });
    if (currentSession) {
        await userSession.update({ token: token, expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) }, { where: { user_id: userObj.id } });
    } else {
        await userSession.create({ user_id: userObj.id, token: token, expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) });
    }
    res.status(200).json({ message: 'Login success', data: userObj });

}

module.exports = loginService;