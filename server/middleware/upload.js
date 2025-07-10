// server/middleware/upload.js
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'event-posters',
    format: async (req, file) => 'png', // optional: jpg/png
    public_id: (req, file) => uuidv4(),
  },
});

const upload = multer({ storage });

module.exports = upload;
