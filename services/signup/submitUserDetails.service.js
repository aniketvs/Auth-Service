const userDetails = require('../../models/userDetails.model');
const bcrypt=require('bcrypt');
require('dotenv').config();
const submitUserDetailsService = async (req, res) => {

    const { number, email, name, password } = req.body;
    const user = await userDetails.findOne({ where: { number: number } });
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
    res.status(200).json({ message: "User details submitted successfully" });
}

module.exports = { submitUserDetailsService };