const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@college.com' });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);

      const adminUser = new User({
        name: 'Admin',
        email: 'admin@college.com',
        password: hashedPassword,
        role: 'admin',
      });

      await adminUser.save();
      console.log('✅ Admin user seeded successfully');
    } else {
      console.log('⚠️ Admin already exists');
    }

    process.exit();
  } catch (error) {
    console.error('❌ Failed to seed admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
