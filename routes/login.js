const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

// Login user
router.post("/", loginController.loginUser);

module.exports = router;
