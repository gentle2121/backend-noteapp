const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../CONTROLLER/Profilecontroller");

router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

module.exports = router;
