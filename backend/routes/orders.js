// backend/routes/orders.js
const express = require('express');
const router = express.Router();

// Get all orders
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Orders endpoint working' });
});

// Create order
router.post('/', (req, res) => {
  res.json({ success: true, message: 'Order created' });
});

module.exports = router;