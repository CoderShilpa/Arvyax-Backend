const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());
const sessionRoutes = require("./routes/sessionRoutes");
const app = express();

// ✅ MIDDLEWARE — MUST COME BEFORE ROUTES
app.use(cors());
app.use(express.json()); // Required to parse JSON in req.body

// ✅ ROUTES
app.use("/api/auth", authRoutes);

app.use("/api", sessionRoutes);

// ✅ MONGO CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 4000, () => {
      console.log("Server running on http://localhost:4000");
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
