// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nameEn: {
    type: String,
    required: [true, 'Please add English name'],
    trim: true
  },
  nameAm: {
    type: String,
    required: [true, 'Please add Amharic name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please add price'],
    min: 0
  },
  category: {
    type: String,
    enum: ['women', 'men', 'accessories', 'all'],
    default: 'all'
  },
  image: {
    type: String,
    default: ''
  },
  isNewProduct: {
    type: Boolean,
    default: false
  },
  descriptionEn: {
    type: String,
    default: ''
  },
  descriptionAm: {
    type: String,
    default: ''
  },
  sizes: [{
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL']
  }],
// Add to models/Product.js schema
stock: {
  type: Number,
  default: 0,
  min: 0
}
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);