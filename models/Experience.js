const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    type: {
      type: String,
      enum: ["internship", "fulltime", "parttime", "freelance", "contract"],
      default: "fulltime",
    },
    location: { type: String, default: "" },
    remote: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, default: "" },
    highlights: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Experience", experienceSchema);
