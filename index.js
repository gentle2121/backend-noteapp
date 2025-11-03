// ✅ server.js (clean version)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Import clean route files
const userRoutes = require("./routes/userRoutes");   // For signup/register etc.
const authRoutes = require("./routes/authRoutes");   // For login, refresh, profile
const noteRoutes = require("./routes/NoteRoutes");   // For CRUD notes
const profileRoutes = require("./routes/ProfileRoutes"); // Optional (user details)

// ✅ Register routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/profile", profileRoutes);

// ✅ Default test route
app.get("/", (req, res) => res.send("✅ API is running successfully..."));

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 9100;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
