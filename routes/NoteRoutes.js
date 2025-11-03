


const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authmiddleware");
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../CONTROLLER/Notecontroller");

// ✅ Get all notes for the logged-in user
router.get("/", authMiddleware, getNotes);

// ✅ Create a new note
router.post("/", authMiddleware, createNote);

// ✅ Update a note
router.put("/:id", authMiddleware, updateNote);

// ✅ Delete a note
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
