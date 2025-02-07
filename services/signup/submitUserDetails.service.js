const userDetails = require('../../models/userDetails.model');
const userSession = require('../../models/userSession.model');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const submitUserDetailsService = async (req, res) => {

    const { number, email, name, password } = req.body;
    let user = await userDetails.findOne({ where: { number: number } });
    if (!user) {
        return res.status(400).json({ message: "User not exists" });
    }
    else if (!user?.dataValues?.is_verified) {
        return res.status(400).json({ message: "User not verified" });
    } else if (user?.dataValues?.password) {
            return res.status(400).json({ message: "User details already submitted" });
    }
    const hashPassword=await bcrypt.hash(password,10);
    await userDetails.update({ email: email, name: name, password: hashPassword }, { where: { number: number } });
    user= await userDetails.findOne({ where: { number: number } });
    const token = await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });
    delete user.password;
    user.token = token;
    await userSession.create({ user_id: user.id, token: token, expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) });
    res.status(200).json({ message: "User details submitted successfully" });
}

module.exports = { submitUserDetailsService };