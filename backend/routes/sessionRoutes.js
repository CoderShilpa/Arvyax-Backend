const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const {
  getAllPublishedSessions,
  getUserSessions,
  getSingleSession,
  saveDraftSession,
  publishSession,
} = require("../controllers/sessionController");

// Public
router.get("/sessions", getAllPublishedSessions);

// Authenticated
router.get("/my-sessions", authenticateToken, getUserSessions);
router.get("/my-sessions/:id", authenticateToken, getSingleSession);
router.post("/my-sessions/save-draft", authenticateToken, saveDraftSession);
router.post("/my-sessions/publish", authenticateToken, publishSession);

// ✅ New route to fix 404 error from frontend (SessionEditor.jsx)
router.post("/sessions", authenticateToken, saveDraftSession); // <--- This is the missing route

module.exports = router;
