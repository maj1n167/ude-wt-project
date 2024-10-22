// controllers/userController.js
const User = require('../models/userModel');

const bcrypt = require('bcryptjs');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new user
// @route   POST /api/users
// @access  Public
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please fill all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      hashedPassword, // Note: In production, password should be hashed
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};


// User login
exports.login = async (req, res,next) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!userExists) {
      res.status(400);
      throw new Error('No existing user');
    }
    res.json(user);

    const storedHashedPassword = user.password;

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);

    if (isPasswordValid) {
      res.status(200).json({message: 'Login successful'});
    } else {
      res.status(401).json({error: 'Invalid credentials'});
    }
  } catch (error) {
    next(error);
  }
};

