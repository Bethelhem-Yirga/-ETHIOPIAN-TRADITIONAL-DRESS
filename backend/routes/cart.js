// routes/cart.js
const express = require('express');
const router = express.Router();
const {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  mergeCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

// Public routes (require sessionId in headers)
router.get('/', getCartItems);
router.post('/', addToCart);
router.put('/:itemId', updateCartItem);
router.delete('/:itemId', removeFromCart);
router.delete('/', clearCart);

// Protected routes
router.post('/merge', protect, mergeCart);

module.exports = router;