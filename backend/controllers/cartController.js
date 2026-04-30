// controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Helper: Get or create cart
const getCart = async (userId, sessionId) => {
  let cart;
  
  if (userId) {
    // Find cart by user ID
    cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }
  } else if (sessionId) {
    // Find cart by session ID (guest user)
    cart = await Cart.findOne({ sessionId }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ sessionId, items: [] });
    }
  }
  
  return cart;
};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private (or Public with sessionId)
const getCartItems = async (req, res) => {
  try {
    const userId = req.user?._id;
    const sessionId = req.headers['x-session-id'];
    
    const cart = await getCart(userId, sessionId);
    
    res.status(200).json({
      success: true,
      cart: {
        items: cart.items,
        subtotal: cart.subtotal,
        totalItems: cart.totalItems
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private (or Public with sessionId)
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size = 'M' } = req.body;
    const userId = req.user?._id;
    const sessionId = req.headers['x-session-id'];
    
    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available`
      });
    }
    
    // Get or create cart
    let cart = await getCart(userId, sessionId);
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId && item.size === size
    );
    
    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      
      // Check stock again
      if (product.stock < newQuantity) {
        return res.status(400).json({
          success: false,
          message: `Cannot add ${quantity} more. Only ${product.stock - cart.items[existingItemIndex].quantity} available`
        });
      }
      
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        nameEn: product.nameEn,
        nameAm: product.nameAm,
        price: product.price,
        size: size,
        quantity: quantity,
        image: product.image || '',
        stock: product.stock
      });
    }
    
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      cart: {
        items: cart.items,
        subtotal: cart.subtotal,
        totalItems: cart.totalItems
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private (or Public with sessionId)
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;
    const userId = req.user?._id;
    const sessionId = req.headers['x-session-id'];
    
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }
    
    let cart = await getCart(userId, sessionId);
    
    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
    
    // Check stock
    const product = await Product.findById(cart.items[itemIndex].product);
    if (product && product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available`
      });
    }
    
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Cart updated',
      cart: {
        items: cart.items,
        subtotal: cart.subtotal,
        totalItems: cart.totalItems
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private (or Public with sessionId)
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user?._id;
    const sessionId = req.headers['x-session-id'];
    
    let cart = await getCart(userId, sessionId);
    
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      cart: {
        items: cart.items,
        subtotal: cart.subtotal,
        totalItems: cart.totalItems
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private (or Public with sessionId)
const clearCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    const sessionId = req.headers['x-session-id'];
    
    let cart = await getCart(userId, sessionId);
    
    cart.items = [];
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      cart: {
        items: [],
        subtotal: 0,
        totalItems: 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Merge guest cart with user cart (after login)
// @route   POST /api/cart/merge
// @access  Private
const mergeCart = async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'];
    const userId = req.user._id;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID required'
      });
    }
    
    // Get guest cart
    const guestCart = await Cart.findOne({ sessionId });
    
    if (!guestCart || guestCart.items.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'Nothing to merge'
      });
    }
    
    // Get or create user cart
    let userCart = await Cart.findOne({ user: userId });
    if (!userCart) {
      userCart = await Cart.create({ user: userId, items: [] });
    }
    
    // Merge items
    for (const guestItem of guestCart.items) {
      const existingItemIndex = userCart.items.findIndex(
        item => item.product.toString() === guestItem.product.toString() && 
                item.size === guestItem.size
      );
      
      if (existingItemIndex > -1) {
        userCart.items[existingItemIndex].quantity += guestItem.quantity;
      } else {
        userCart.items.push(guestItem);
      }
    }
    
    await userCart.save();
    
    // Delete guest cart
    await Cart.findByIdAndDelete(guestCart._id);
    
    res.status(200).json({
      success: true,
      message: 'Cart merged successfully',
      cart: {
        items: userCart.items,
        subtotal: userCart.subtotal,
        totalItems: userCart.totalItems
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  mergeCart
};