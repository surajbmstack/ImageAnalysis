const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(403).send("Access denied.");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(verified.id);
        next();
    } catch (err) {
        res.status(401).send("Invalid Token");
    }
};

module.exports = {protect};
