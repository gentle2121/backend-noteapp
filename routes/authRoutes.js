


// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { loginUser, getAuthProfile } = require("../CONTROLLER/authcontroller");
const authMiddle = require("../Middleware/Authmiddle");

router.post("/login", loginUser);
router.get("/profile", authMiddle, getAuthProfile);

module.exports = router;
