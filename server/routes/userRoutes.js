const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Controllers (your existing ones)
const {
  getAllUsers,
  updateUserRole,
  deleteUser
} = require('../controllers/userController');

// Middleware
const protect = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');


// 🔹 GET all organizers
router.get('/organizers', async (req, res) => {
  try {
    const organizers = await User.find({ role: 'organizer' });
    res.json(organizers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch organizers' });
  }
});

// 🔹 POST new organizer (Admin only)
router.post(
  '/organizers',
  protect,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'Email already in use' });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newOrganizer = new User({
        name,
        email,
        password: hashedPassword,
        role: 'organizer',
      });

      await newOrganizer.save();
      res.status(201).json({ message: 'Organizer created successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error creating organizer' });
    }
  }
);

// 🔹 PUT update organizer (Admin only)
router.put(
  '/organizers/:id',
  protect,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const organizer = await User.findById(req.params.id);
      if (!organizer || organizer.role !== 'organizer') {
        return res.status(404).json({ message: 'Organizer not found' });
      }

      organizer.name = name || organizer.name;
      organizer.email = email || organizer.email;

      if (password) {
        organizer.password = await bcrypt.hash(password, 10);
      }

      await organizer.save();
      res.json({ message: 'Organizer updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error updating organizer' });
    }
  }
);

// 🔹 DELETE organizer (Admin only)
router.delete(
  '/organizers/:id',
  protect,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const organizer = await User.findById(req.params.id);
      if (!organizer || organizer.role !== 'organizer') {
        return res.status(404).json({ message: 'Organizer not found' });
      }

      await organizer.deleteOne();
      res.json({ message: 'Organizer deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting organizer' });
    }
  }
);


// 🔐 Admin-only routes

// ✅ GET all users
router.get('/', protect, checkRole(['admin']), getAllUsers);

// ✅ PUT update user role
router.put('/:id/role', protect, checkRole(['admin']), updateUserRole);

// ✅ DELETE user
router.delete('/:id', protect, checkRole(['admin']), deleteUser);


module.exports = router;
