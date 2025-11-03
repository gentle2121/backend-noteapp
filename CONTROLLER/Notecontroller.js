const Note = require("../models/Note");

// @desc Get all notes for logged-in user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

// @desc Create a new note
exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({
      user: req.user._id,
      title: req.body.title,
      content: req.body.content,
      eventDate: req.body.eventDate || null,
      remind: req.body.remind || false,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: "Failed to create note" });
  }
};

// @desc Update note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(400).json({ message: "Failed to update note" });
  }
};

// @desc Delete note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note" });
  }
};
