const router = require("express").Router();
const Experience = require("../models/Experience");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find().sort({
      order: 1,
      startDate: -1,
    });
    res.json({ success: true, experiences });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.status(201).json({ success: true, experience: exp });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, experience: exp });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
