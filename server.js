const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

//Core Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      // Allow localhost in development
      if (
        origin === "http://localhost:3000" ||
        origin === "http://127.0.0.1:3000"
      ) {
        return callback(null, true);
      }

      // Allow your exact Vercel production URL
      if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
        return callback(null, true);
      }

      // Allow ALL Vercel preview deployment URLs (*.vercel.app)
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // Block everything else
      callback(new Error("CORS: Not allowed → " + origin));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rate Limiting
const rateLimit = require("./middleware/rateLimit");
const strictLimit = rateLimit(5, 60 * 1000);
const contactLimit = rateLimit(3, 60 * 1000);
const apiLimit = rateLimit(60, 60 * 1000);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/experience", require("./routes/experience"));
app.use("/api/messages", require("./routes/messages"));
// app.use("/api/auth", strictLimit, require("./routes/auth"));
// app.use("/api/profile", apiLimit, require("./routes/profile"));
// app.use("/api/projects", apiLimit, require("./routes/projects"));
// app.use("/api/skills", apiLimit, require("./routes/skills"));
// app.use("/api/experience", apiLimit, require("./routes/experience"));
// app.use("/api/messages", contactLimit, require("./routes/messages"));

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date(), env: process.env.NODE_ENV });
});

// Dashboard Stats (admin)
const authMiddleware = require("./middleware/auth");
app.get("/api/stats", authMiddleware, async (req, res) => {
  try {
    const [projects, skills, experiences, messages, unread] = await Promise.all(
      [
        require("./models/Project").countDocuments(),
        require("./models/Skill").countDocuments(),
        require("./models/Experience").countDocuments(),
        require("./models/Message").countDocuments(),
        require("./models/Message").countDocuments({ read: false }),
      ],
    );
    res.json({
      success: true,
      stats: { projects, skills, experiences, messages, unread },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    await seedAdmin();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server  → http://localhost:${PORT}`);
      console.log(`📡 API     → http://localhost:${PORT}/api`);
      console.log(`🏥 Health  → http://localhost:${PORT}/api/health`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });

// Seed on first run
async function seedAdmin() {
  const Admin = require("./models/Admin");
  const Profile = require("./models/Profile");
  const bcrypt = require("bcryptjs");

  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) return;

  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await Admin.create({
    name: "Admin",
    email: process.env.ADMIN_EMAIL,
    password: hash,
  });
  console.log("👤 Admin created:", process.env.ADMIN_EMAIL);

  await Profile.create({
    name: "Bhavin Ghoghari",
    tagline: "MERN Stack Developer",
    bio: "MERN Stack Developer from Surat, Gujarat with 6 months of remote internship experience.",
    location: "Surat, Gujarat, India",
    email: "bhavinrghoghari@gmail.com",
    github: "https://github.com/BhavinGhoghari",
    linkedin: "https://www.linkedin.com/in/bhavin-ghoghari-1a3b29249/",
    available: true,
  });
  console.log("📋 Profile seeded — update it from the Admin Panel");
}
