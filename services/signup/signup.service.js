const  kafka  = require('../../config/kafka');
exports.signUpService = async (req, res) => {
    const { number } = req.body;
    if (!number) {
        return res.status(400).json({ message: "Number is required" });
    }
    // const user = await userDetails.findOne({ where: { number: number } });
    // if (user) {
    //     return res.status(400).json({ message: "User already exists" });
    // }
    // await userDetails.create({ number: number });
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