const Session = require("../models/Session");

const getAllPublishedSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getSingleSession = async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.user.userId, // ensure the session belongs to the logged-in user
    });

    if (!session) {
      return res.status(404).json({ msg: "Session not found" });
    }

    res.status(200).json(session);
  } catch (error) {
    console.error("🔥 Error in getSingleSession:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
const saveDraftSession = async (req, res) => {
  try {
    const { title, tags, jsonUrl } = req.body;

    if (!title || !jsonUrl) {
      return res.status(400).json({ msg: "Title and JSON URL are required" });
    }

    const session = new Session({
      user_id: req.user, // ✅ use user_id here as per your model
      title,
      tags,
      jsonUrl,
      status: "draft",
    });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error("🔥 Error in saveDraftSession:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const publishSession = async (req, res) => {
  try {
    const { title, tags, json_file_url } = req.body;

    const session = new Session({
      user_id: req.user,
      title,
      tags,
      json_file_url,
      status: "published"
    });

    await session.save();
    res.status(201).json({ msg: "Session published", session });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getAllPublishedSessions,
  getUserSessions,
  getSingleSession,
  saveDraftSession,
  publishSession,
};
