// routes/products.js - Fixed (temporarily remove admin middleware)
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

// const { protect, admin } = require('../middleware/auth'); // Comment out for now

// Get all products
// routes/products.js - Advanced filtering
router.get('/', async (req, res) => {
  const { category, minPrice, maxPrice, search } = req.query;
  
  let filter = {};
  
  if (category && category !== 'all') {
    filter.category = category;
  }
  
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  
  if (search) {
    filter.nameEn = { $regex: search, $options: 'i' };
  }
  
  const products = await Product.find(filter);
  res.json({ products });
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create product (temporarily without auth)
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update product (temporarily without auth)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete product (temporarily without auth)
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Public routes (anyone can view)
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected admin routes (only admins can modify)
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;