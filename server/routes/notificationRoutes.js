const express = require('express');
const router = express.Router();

const {
  getNotifications,
  createNotification,
  markAllAsRead,
} = require('../controllers/notificationController');

const protect = require('../middleware/authMiddleware'); // ✅ if you're using `module.exports = protect`


router.get('/', protect, getNotifications);
router.post('/', protect, createNotification);
router.put('/mark-all-read', protect, markAllAsRead);

module.exports = router;
