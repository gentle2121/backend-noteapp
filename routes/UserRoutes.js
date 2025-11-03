const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUserProfile,
  updateUserProfile,
} = require("../CONTROLLER/Usercontroller");

// Signup
router.post("/register", registerUser);

// Profile
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

module.exports = router;
