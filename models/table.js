const mongoose = require("mongoose");

const TableSchema = mongoose.Schema({
  eventId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Round", "Square", "VIP", "Kids", "Default"],
    default: "Default",
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  guests: {
    type: [String], // array of phone numbers
    default: [],
  },
});

const Table = mongoose.model("Table", TableSchema);
module.exports = Table;
