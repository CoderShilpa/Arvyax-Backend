const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const {
  getAllPublishedSessions,
  getUserSessions,
  getSingleSession,
  saveDraftSession,
  updateSession,
  publishSession,
} = require("../controllers/sessionController");

// Public
router.get("/sessions", getAllPublishedSessions);

// Authenticated
router.get("/my-sessions", authenticateToken, getUserSessions);
router.get("/my-sessions/:id", authenticateToken, getSingleSession); // ✅ for fetching
router.post("/my-sessions/save-draft", authenticateToken, saveDraftSession); // ✅ for new session
router.put("/my-sessions/:id", authenticateToken, updateSession); // ✅ for editing
router.post("/my-sessions/publish", authenticateToken, publishSession);
router.post("/sessions", authenticateToken, saveDraftSession); // optionally needed

module.exports = router;