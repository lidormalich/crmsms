const bcrypt = require("bcrypt");
const joi = require("joi");
const User = require("../models/usersmodel");
const JWT = require("jsonwebtoken");

const loginSchema = joi.object({
  email: joi.string().required().min(6).email(),
  password: joi.string().required().min(8),
});

/**
 * Login user and return JWT token
 */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate input
    const { error } = loginSchema.validate({ email, password });
    if (error) return res.status(400).send("Invalid request body");

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Wrong Email or Password");
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Email or password is wrong");
    }

    // Generate Token
    const token = JWT.sign(
      { _id: user._id, email: user.email, first_name: user.first_name },
      process.env.JWT_Key
    );
    res.status(200).send({ first_name: user.first_name, Authorization: token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Login failed");
  }
};
