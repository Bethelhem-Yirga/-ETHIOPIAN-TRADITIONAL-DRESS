import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, loading } = useCart();
  const { isAmharic } = useLanguage();
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    
    // Format product for cart
    const cartProduct = {
      _id: product._id || product.id,
      nameEn: product.name,
      nameAm: product.amharicName,
      price: product.price,
      image: product.image
    };
    
    const result = await addToCart(cartProduct._id, 1, 'M');
    
    if (result.success) {
      setMessage(isAmharic ? 'በካርት ውስጥ ተጨምሯል!' : 'Added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage(result.message);
      setTimeout(() => setMessage(''), 2000);
    }
    
    setIsAdding(false);
  };

  return (
    <>
      <div className="card">
        <div className="card__shine"></div>
        <div className="card__glow"></div>
        <div className="card__content">
          {product.isNew && <div className="card__badge">NEW</div>}
          <div className="card__image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="card__text">
            <p className="card__title">{product.name}</p>
            <p className="card__description">{product.amharicName}</p>
          </div>
          <div className="card__footer">
            <div className="card__price">ETB {product.price.toLocaleString()}</div>
            <div 
              className={`card__button ${isAdding ? 'loading' : ''}`}
              onClick={handleAddToCart}
            >
              {isAdding ? (
                <div className="spinner-small"></div>
              ) : (
                <svg height="16" width="16" viewBox="0 0 24 24">
                  <path
                    strokeWidth="2"
                    stroke="currentColor"
                    d="M4 12H20M12 4V20"
                    fill="currentColor"
                  ></path>
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Message */}
      {message && (
        <div className="cart-toast">
          {message}
        </div>
      )}
    </>
  );
};

export default ProductCard;