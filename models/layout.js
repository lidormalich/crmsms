const mongoose = require("mongoose");

const LayoutSchema = mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
  },
  layout: {
    type: Object, // JSON of the full layout (tables, positions, elements, etc)
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Layout = mongoose.model("Layout", LayoutSchema);
module.exports = Layout;
