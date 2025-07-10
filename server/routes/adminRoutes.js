const express = require('express');
const router = express.Router();
const Event = require('../models/Event');      // Adjust path if needed
const User = require('../models/User');        // Adjust path if needed

// GET /api/admin/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalUsers = await User.countDocuments();

    const today = new Date();
    const upcomingEvents = await Event.countDocuments({ date: { $gte: today } });

    const recentEvents = await Event.find({})
      .sort({ date: -1 })
      .limit(5)
      .select('title date');

    res.json({
      stats: {
        totalEvents,
        totalUsers,
        upcomingEvents,
      },
      recentEvents,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
