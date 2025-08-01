const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");

const sessionRoutes = require("./routes/sessionRoutes");
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
