// // server/routes/eventRoutes.js
// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/upload');
// const Event = require('../models/Event'); // Make sure the path is correct
// const {
//   createEvent,
//   getAllEvents,
//   getEventById,
//   updateEvent,
//   deleteEvent,
// } = require('../controllers/eventController');

// const protect = require('../middleware/authMiddleware');
// const { checkRole } = require('../middleware/roleMiddleware');



// //dashboard
// router.get('/', async (req, res) => {
//   try {
//     const events = await Event.find().sort({ date: -1 });
//     res.json(events);
//   } catch (err) {
//     console.error('Error fetching events:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// // @route   GET /api/events
// // @desc    Get all events
// // @access  Public
// router.get('/', getAllEvents);

// // @route   GET /api/events/:id
// // @desc    Get single event by ID
// // @access  Public
// router.get('/:id', getEventById);

// // @route   POST /api/events
// // @desc    Create a new event
// // @access  Admin/Organizer
// router.post('/', protect, checkRole(['admin', 'organizer']), upload.single('poster'), createEvent);

// // @route   PUT /api/events/:id
// // @desc    Update event
// // @access  Admin/Organizer
// router.put('/:id', protect, checkRole(['admin', 'organizer']), upload.single('poster'), updateEvent);

// // @route   DELETE /api/events/:id
// // @desc    Delete event
// // @access  Admin/Organizer
// router.delete('/:id', protect, checkRole(['admin', 'organizer']), deleteEvent);

// module.exports = router;





const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Event = require('../models/Event');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

const protect = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

// ✅ Get all events (handled in controller)
router.get('/', getAllEvents);

// ✅ Get single event by ID
router.get('/:id', getEventById);

// ✅ Create new event (Admin/Organizer only)
router.post(
  '/',
  protect,
  checkRole(['admin', 'organizer']),
  upload.single('poster'),
  createEvent
);

// ✅ Update event
router.put(
  '/:id',
  protect,
  checkRole(['admin', 'organizer']),
  upload.single('poster'),
  updateEvent
);

// ✅ Delete event
router.delete(
  '/:id',
  protect,
  checkRole(['admin', 'organizer']),
  deleteEvent
);

module.exports = router;
