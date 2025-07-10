const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { validateRegistration } = require('../utils/validators');

// @desc    Register for an event
// @route   POST /api/registrations
// @access  User
const registerForEvent = async (req, res) => {
  const errors = validateRegistration(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const { eventId } = req.body;

    const existing = await Registration.findOne({
      user: req.user._id,
      event: eventId,
    });

    if (existing) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    const registration = new Registration({
      user: req.user._id,
      event: eventId,
    });

    const saved = await registration.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

// @desc    Get registrations of the logged-in user
// @route   GET /api/registrations/my
// @access  User
const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id }).populate('event');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
};

// @desc    Get all registrations (admin)
// @route   GET /api/registrations
// @access  Admin
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('user', 'name email')
      .populate('event', 'title');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all registrations' });
  }
};

// @desc    Get event registrations for organizer
// @route   GET /api/registrations/organizer
// @access  Organizer
const getOrganizerRegistrations = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id }).select('_id');
    const eventIds = events.map((event) => event._id);

    const registrations = await Registration.find({ event: { $in: eventIds } })
      .populate('user', 'name email')
      .populate('event', 'title');

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
};

// @desc    Get users registered for a specific event
// @route   GET /api/registrations/event/:id
// @access  Organizer/Admin
const getUsersForEvent = async (req, res) => {
  try {
    const registrations = await Registration.find({ event: req.params.id }).populate('user', 'name email');
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get all events a user has registered for
// @route   GET /api/registrations/user/:id
// @access  Admin/Organizer
const getEventsForUser = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.params.id }).populate('event', 'title');
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  registerForEvent,
  getMyRegistrations,
  getAllRegistrations,
  getOrganizerRegistrations,
  getUsersForEvent,
  getEventsForUser,
};
