const User = require("../models/Usermodels");
const bcrypt = require("bcryptjs");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    if (!phoneNumber || phoneNumber.trim() === "") {
      return res.status(400).json({ success: false, message: "Phone number cannot be empty" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) {
      return res.status(400).json({ success: false, message: "Phone number already registered" });
    }

    const user = new User({ name, email, phoneNumber, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: { id: user._id, name: user.name, email: user.email, phoneNumber: user.phoneNumber },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// GET PROFILE
const getUserProfile = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE PROFILE
const updateUserProfile = async (req, res) => {
  try {
    const { email, name, phoneNumber, avatarBase64 } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.avatarBase64 = avatarBase64 || user.avatarBase64;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  getUserProfile,
  updateUserProfile,
};
