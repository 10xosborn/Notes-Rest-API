const express = require("express");
const requireAuth = require("../middleware/requireAuth.js");
const {
    postNote,
    getAllNote,
    getNoteById,
    updateNoteById,
    deletetNoteById,
    getSearchNote,
} = require("../controllers/note.controller.js");


const router = express.Router();

// Note routes
router.post("/note", requireAuth, postNote);
router.get("/note/search", requireAuth, getSearchNote);
router.get("/note", requireAuth, getAllNote);
router.get("/note/:id",requireAuth, getNoteById);
router.put("/note/:id",requireAuth, updateNoteById);
router.delete("/note/:id", requireAuth, deletetNoteById);

module.exports = router;