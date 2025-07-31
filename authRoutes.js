const cors = require("cors");
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

const app = express();

app.use(cors());
app.use(express.json()); // ✅ This should come before your routes

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
