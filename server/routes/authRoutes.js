// routes/authRoutes.js
const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile
} = require('../controllers/authController'); // 🔁 this imports the logic (controller functions)

const protect = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Route
router.get('/auth/profile', protect, getUserProfile);

module.exports = router;
