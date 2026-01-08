const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;

        const user = await User.findById(req.user);
        if (user.isBlocked) {
            return res.status(403).json({ message: "User is blocked" });
        }

        next();
    } catch (error) {
        console.error(error); // helpful for debugging
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
