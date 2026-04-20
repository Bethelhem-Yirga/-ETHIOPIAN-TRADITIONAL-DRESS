// routes/orders.js - Fixed
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
// const { protect } = require('../middleware/auth'); // Comment out for now

// Create order (temporarily without auth)
router.post('/', async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
    
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items' });
    }
    
    // Create a temporary user ID if none provided
    const order = new Order({
      user: req.body.userId || '67ff8a8c8a8c8a8c8a8c8a8c', // temporary ID
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice
    });
    
    const createdOrder = await order.save();
    res.status(201).json({ success: true, order: createdOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user orders
router.get('/myorders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order to paid
router.put('/:id/pay', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time
      };
      const updatedOrder = await order.save();
      res.json({ success: true, order: updatedOrder });
    } else {
      res.status(404).json({ success: false, message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;