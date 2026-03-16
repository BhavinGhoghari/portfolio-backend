const router = require("express").Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth");

// POST /api/messages  (public — contact form)
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    const msg = await Message.create({
      name,
      email,
      subject,
      message,
      ip: req.ip,
    });
    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/messages  (admin)
router.get("/", auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/messages/:id/read  (admin)
router.put("/:id/read", auth, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );
    res.json({ success: true, message: msg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/messages/:id  (admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/messages/stats  (admin)
router.get("/stats", auth, async (req, res) => {
  try {
    const total = await Message.countDocuments();
    const unread = await Message.countDocuments({ read: false });
    res.json({ success: true, stats: { total, unread } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
