// const Event = require('../models/Event');
// const { validateEvent } = require('../utils/validators');

// // @desc    Create a new event
// // @route   POST /api/events
// // @access  Organizer/Admin
// const createEvent = async (req, res) => {
//   try {
//     const { title, description, date, location, category } = req.body;

//     const newEvent = new Event({
//       title,
//       description,
//       date,
//       location,
//       category,
//       createdBy: req.user._id,
//       poster: req.file ? req.file.path : null, // if using multer
//     });

//     const savedEvent = await newEvent.save();
//     res.status(201).json(savedEvent);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create event' });
//   }
// };

// // @desc    Get all events
// // @route   GET /api/events
// // @access  Public
// const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find().populate('category', 'name').populate('createdBy', 'name role');
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch events' });
//   }
// };

// // @desc    Get single event by ID
// // @route   GET /api/events/:id
// // @access  Public
// const getEventById = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id).populate('category', 'name');

//     if (!event) return res.status(404).json({ message: 'Event not found' });

//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch event' });
//   }
// };

// // @desc    Update event
// // @route   PUT /api/events/:id
// // @access  Organizer/Admin
// const updateEvent = async (req, res) => {
//   try {
//     const { title, description, date, location, category } = req.body;
//     const event = await Event.findById(req.params.id);

//     if (!event) return res.status(404).json({ message: 'Event not found' });

//     event.title = title || event.title;
//     event.description = description || event.description;
//     event.date = date || event.date;
//     event.location = location || event.location;
//     event.category = category || event.category;
//     if (req.file) {
//       event.poster = req.file.path;
//     }

//     const updated = await event.save();
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update event' });
//   }
// };

// // @desc    Delete event
// // @route   DELETE /api/events/:id
// // @access  Organizer/Admin
// const deleteEvent = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);

//     if (!event) return res.status(404).json({ message: 'Event not found' });

//     await event.remove();
//     res.json({ message: 'Event deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete event' });
//   }
// };

// module.exports = {
//   createEvent,
//   getAllEvents,
//   getEventById,
//   updateEvent,
//   deleteEvent,
// };



const Event = require('../models/Event');
const { validateEvent } = require('../utils/validators');

// @desc    Create a new event
// @route   POST /api/events
// @access  Organizer/Admin
const createEvent = async (req, res) => {
  const errors = validateEvent(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const { title, description, date, location, category } = req.body;
     const poster = req.file ? req.file.path : null;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      category,
      createdBy: req.user._id,
      poster
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event' });
  }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('category', 'name')
      .populate('createdBy', 'name role');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('category', 'name');

    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch event' });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Organizer/Admin
const updateEvent = async (req, res) => {
  const errors = validateEvent(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const { title, description, date, location, category } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.title = title;
    event.description = description;
    event.date = date;
    event.location = location;
    event.category = category;
    if (req.file) {
      event.poster = req.file.path;
    }

    const updated = await event.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event' });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Organizer/Admin
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.remove();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event' });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
