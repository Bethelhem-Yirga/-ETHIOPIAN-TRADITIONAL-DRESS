// models/Product.js - Simplified for testing
const mongoose = require('mongoose');

// models/Product.js - Update the schema
const productSchema = new mongoose.Schema({
  nameEn: { type: String, required: true },
  nameAm: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['women', 'men', 'accessories'] // Only these 3 options allowed
  },
  // Use a different name instead of 'isNew'
  isNewProduct: { type: Boolean, default: false },  // Changed from 'isNew'
  // ... other fields
}, { 
  suppressReservedKeysWarning: true  // Suppresses the warning
});

module.exports = mongoose.model('Product', productSchema);