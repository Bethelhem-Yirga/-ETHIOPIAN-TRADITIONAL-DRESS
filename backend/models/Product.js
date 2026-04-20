// models/Product.js - Simplified for testing
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nameEn: { type: String, required: true },
  nameAm: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String },
  isNew: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);