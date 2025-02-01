const { getClient, initRedis } = require("../../config/redisConfig");
const userDetails = require('../../models/userDetails.model');

const verifyOtpService=async(req,res)=>{
    const { number, otp } = req.body;
    if (!number || !otp) {
        return res.status(400).json({ message: "Number and OTP are required" });
    }
    let client = getClient();
    if (!client || !client.isOpen) {
        await initRedis();
        client = getClient();
    }
    const otpFromRedis = await client.get(`otp:${number}`);
    console.log(otpFromRedis);
    if (!otpFromRedis) {
        return res.status(400).json({ message: "OTP expired" });
    }
    if (otpFromRedis != otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }
    await client.del(`otp:${number}`);
    await userDetails.update({ is_verified: true }, { where: { number: number } });
    res.status(200).json({ message: "OTP verified successfully" });

}
module.exports={verifyOtpService};