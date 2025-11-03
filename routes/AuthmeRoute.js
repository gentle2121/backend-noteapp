const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authmiddleware");
const { getMe } = require("../controllers/authController");

router.get("/me", authMiddleware, getMe);

module.exports = router;
