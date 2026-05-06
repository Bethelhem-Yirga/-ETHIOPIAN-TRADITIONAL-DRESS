// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  nameEn: String,
  nameAm: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL'],
    default: 'M'
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  image: String,
  stock: Number
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    sparse: true,
    index: true
  },
  sessionId: {
    type: String,
    sparse: true,
    index: true
  },
  items: [cartItemSchema],
  subtotal: {
    type: Number,
    default: 0
  },
  totalItems: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.subtotal = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  this.totalItems = this.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  
  next();
});

module.exports = mongoose.model('Cart', cartSchema);