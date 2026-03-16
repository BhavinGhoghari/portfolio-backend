const router = require("express").Router();
const Profile = require("../models/Profile");
const auth = require("../middleware/auth");

// GET /api/profile  (public)
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/profile  (admin only)
router.put("/", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      Object.assign(profile, req.body);
      await profile.save();
    } else {
      profile = await Profile.create(req.body);
    }
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
