// seed-admin.js - Create admin user
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const adminExists = await User.findOne({ email: 'admin@kutacollections.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }
    
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@kutacollections.com',
      password: 'Admin123!',
      phone: '0912345678',
      role: 'admin'
    });
    
    console.log('Admin user created successfully!');
    console.log('Email: admin@kutacollections.com');
    console.log('Password: Admin123!');
    
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdmin();