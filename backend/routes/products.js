// backend/routes/products.js - Complete Working Version
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - Get all products
const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query;
    let query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { nameEn: { $regex: search, $options: 'i' } },
        { nameAm: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    let productsQuery = Product.find(query);
    
    if (sort === 'price-low') {
      productsQuery = productsQuery.sort('price');
    } else if (sort === 'price-high') {
      productsQuery = productsQuery.sort('-price');
    } else if (sort === 'newest') {
      productsQuery = productsQuery.sort('-createdAt');
    }
    
    const products = await productsQuery;
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/products/:id - Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/products - Create new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/products/:id - Update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/products/:id - Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;