const bcrypt = require("bcrypt");
const joi = require("joi");
const User = require("../models/usersmodel");

const registrationSchema = joi.object({
  first_name: joi.string().required().min(2),
  last_name: joi.string().required().min(2),
  email: joi.string().required().min(5).email(),
  password: joi.string().required().min(8),
});

/**
 * Register a new user
 */
exports.registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    // Validate input
    const { error } = registrationSchema.validate(req.body);
    if (error) return res.status(400).send("Invalid request body");

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    };
    await User.create(newUser);
    return res.status(200).send("User registered successfully");
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(400).send("Couldn't register user");
  }
};
