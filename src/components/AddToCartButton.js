// src/components/AddToCartButton.js
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import './AddToCartButton.css';

const AddToCartButton = ({ product, size = 'M', disabled = false }) => {
  const { addToCart, loading } = useCart();
  const { isAmharic } = useLanguage();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleAddToCart = async () => {
    if (disabled) return;
    
    const result = await addToCart(product._id, 1, size);
    if (result.success) {
      setMessageType('success');
      setMessage(isAmharic ? 'በካርት ውስጥ ተጨምሯል!' : 'Added to cart!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessageType('error');
      setMessage(result.message);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="add-to-cart-wrapper">
      <button 
        onClick={handleAddToCart} 
        disabled={loading || disabled}
        className={`add-to-cart-btn ${disabled ? 'disabled' : ''}`}
      >
        {loading ? (
          <span className="spinner-small"></span>
        ) : (
          <>
            🛒 {isAmharic ? 'በካርት ውስጥ አስገባ' : 'Add to Cart'}
          </>
        )}
      </button>
      {message && (
        <div className={`cart-message ${messageType}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;