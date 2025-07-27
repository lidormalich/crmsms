const express = require("express");
const router = express.Router();
const Layout = require("../models/layout");

// Get layout for event
router.get("/:eventId", async (req, res) => {
  try {
    const layout = await Layout.findOne({ eventId: req.params.eventId });
    res.json(layout ? layout.layout : null);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch layout" });
  }
});

// Save (upsert) layout for event
router.post("/:eventId", async (req, res) => {
  try {
    const layout = await Layout.findOneAndUpdate(
      { eventId: req.params.eventId },
      { layout: req.body.layout, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json(layout.layout);
  } catch (err) {
    res.status(400).json({ error: "Failed to save layout" });
  }
});

module.exports = router;
