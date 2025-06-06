const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Importing the routes and the updateUserPoints function
const { router: userRoutes, updateUserPoints } = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const challengeRoutes = require("./routes/challengeRoutes");

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// Test route
app.get("/", (req, res) => {
  res.send("🌍 Climate Platform Backend is running...");
});

// Your routes (plug these in once you’re ready)
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/challenge", challengeRoutes);

// Example of using updateUserPoints function (if required)
app.post("/api/update-points", (req, res) => {
  const { userId, points } = req.body;
  updateUserPoints(userId, points)
    .then(() => res.status(200).send("Points updated successfully"))
    .catch((err) => res.status(500).send("Error updating points"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
