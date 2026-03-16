const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    email: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    resume: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    available: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Profile", profileSchema);
