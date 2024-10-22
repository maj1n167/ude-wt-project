// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');

// Get all users
router.get('/', getUsers);

// Create a new user
router.post('/', createUser);

module.exports = router;
