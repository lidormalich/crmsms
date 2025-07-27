const express = require("express");
const router = express.Router();
const Table = require("../models/table");

// Get all tables for an event
router.get("/:eventId", async (req, res) => {
  try {
    const tables = await Table.find({ eventId: req.params.eventId });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tables" });
  }
});

// Create a new table
router.post("/", async (req, res) => {
  try {
    const table = new Table(req.body);
    await table.save();
    res.status(201).json(table);
  } catch (err) {
    res.status(400).json({ error: "Failed to create table" });
  }
});

// Update a table (including guests)
router.put("/:id", async (req, res) => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(table);
  } catch (err) {
    res.status(400).json({ error: "Failed to update table" });
  }
});

// Delete a table
router.delete("/:id", async (req, res) => {
  try {
    await Table.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete table" });
  }
});

module.exports = router;
