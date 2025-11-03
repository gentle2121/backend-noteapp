// Middleware/Authmiddle.js
const jwt = require("jsonwebtoken");
const User = require("../models/Usermodels");

const authMiddle = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ 1. Check for missing token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // ✅ 2. Extract token
    const token = authHeader.split(" ")[1];

    // ✅ 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // ✅ 4. Find user (excluding password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ 5. Attach user to request and continue
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddle;
