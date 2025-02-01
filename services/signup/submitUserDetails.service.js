const userDetails = require('../../models/userDetails.model');
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
    await userDetails.update({ email: email, name: name, password: password }, { where: { number: number } });
    res.status(200).json({ message: "User details submitted successfully" });
}

module.exports = { submitUserDetailsService };