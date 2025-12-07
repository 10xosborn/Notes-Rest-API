require("dotenv").config();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
    const authHeader = req.header("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    try {
        // Decode token
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Find user
        const user = await userModel.findById(payload.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;  // attach user to request
        next();

    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = requireAuth;