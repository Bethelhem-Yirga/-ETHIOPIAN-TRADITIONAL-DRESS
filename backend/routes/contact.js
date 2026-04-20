// routes/contact.js - Fixed
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
// const { protect, admin } = require('../middleware/auth'); // Comment out for now

// Create contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });
    
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all messages (temporarily without admin auth)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort('-createdAt');
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;