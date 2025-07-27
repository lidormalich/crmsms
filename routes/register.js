const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

// Register new user
router.post("/", registerController.registerUser);

module.exports = router;
