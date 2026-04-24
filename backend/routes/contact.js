// backend/routes/contact.js
const express = require('express');
const router = express.Router();

// Submit contact form
router.post('/', (req, res) => {
  res.json({ success: true, message: 'Message sent successfully' });
});

module.exports = router;