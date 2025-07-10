const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const {
  registerForEvent,
  getMyRegistrations,
  getAllRegistrations,
  getOrganizerRegistrations,
} = require('../controllers/registrationController');

const protect = require('../middleware/authMiddleware');
const {checkRole} = require('../middleware/roleMiddleware');







// @route   POST /api/registrations
// @desc    Register for an event
router.post('/', protect, checkRole(['user']), registerForEvent);

// @route   GET /api/registrations/my
// @desc    Get user's registrations
router.get('/my', protect, checkRole(['user']), getMyRegistrations);

// @route   GET /api/registrations
// @desc    Get all registrations (admin)
router.get('/', protect, checkRole(['admin']), getAllRegistrations);

// @route   GET /api/registrations/organizer
// @desc    Get registrations for events created by organizer
router.get('/organizer', protect, checkRole(['organizer']), getOrganizerRegistrations);
router.get('/event/:id', registrationController.getUsersForEvent);
router.get('/user/:id', registrationController.getEventsForUser);
module.exports = router;
