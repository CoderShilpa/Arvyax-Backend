const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded token for debugging
    console.log("✅ Token verified:", decoded);

    // It should contain userId in payload like { userId: ... }
    if (!decoded.userId) {
      return res.status(403).json({ msg: "Invalid token payload" });
    }

    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.status(403).json({ msg: "Invalid token" });
  }
};

module.exports = authenticateToken;
