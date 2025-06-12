exports.verifyToken = (req, res) => {
    try {
        console.log(req.user);
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
console.log("Verifying token for user:", req.user);
        return res.status(200).json({
            status: 'success',
            message: 'Token is valid',
            user: req.user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}