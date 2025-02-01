const  kafka  = require('../../config/kafka');
const userDetails = require('../../models/userDetails.model');
exports.signUpService = async (req, res) => {
    const { number } = req.body;
    if (!number) {
        return res.status(400).json({ message: "Number is required" });
    }
    const user = await userDetails.findOne({ where: { number: number } });
    const isVerified=user?.dataValues?.is_verified;
    if (user && isVerified ){
        return res.status(400).json({ message: "User already exists" });
    }else
   if(!user){
    await userDetails.create({ number: number });
   }
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
        topic: "generate_otp",
        messages: [{ value: JSON.stringify({number:number}) }],
    });
    await producer.disconnect();
    console.log("📩 Sent generate_otp event for", number);
   

    res.status(200).json({ message: "User signed up successfully" });
};