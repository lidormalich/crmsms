const express = require("express");
const router = express.Router();
const sentencesController = require("../controllers/sentencesController");

// Get all sentences
router.get("/all", sentencesController.getAllSentences);

// Create a new sentence
router.post("/", sentencesController.createSentence);

module.exports = router;
