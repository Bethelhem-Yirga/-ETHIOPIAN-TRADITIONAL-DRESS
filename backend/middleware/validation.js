// middleware/validation.js
const validateProduct = (req, res, next) => {
  const { nameEn, nameAm, price } = req.body;
  
  if (!nameEn || nameEn.length < 2) {
    return res.status(400).json({ 
      error: 'Product name must be at least 2 characters' 
    });
  }
  
  if (!price || price < 0) {
    return res.status(400).json({ 
      error: 'Price must be a positive number' 
    });
  }
  
  next(); // Proceed to next function
};

// Use in routes
router.post('/', validateProduct, async (req, res) => {
  // Your create logic here
});