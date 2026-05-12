// src/pages/Cart.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Cart.css';

const Cart = () => {
  const { cart, updateQuantity, removeItem, clearCart, loading } = useCart();
  const { isAmharic } = useLanguage();
  const [updatingId, setUpdatingId] = useState(null);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdatingId(itemId);
    await updateQuantity(itemId, newQuantity);
    setUpdatingId(null);
  };

  const handleRemoveItem = async (itemId) => {
    if (window.confirm(isAmharic ? 'እቃውን ማስወገድ ይፈልጋሉ?' : 'Remove this item?')) {
      await removeItem(itemId);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm(isAmharic ? 'ሁሉንም እቃዎች ማስወገድ ይፈልጋሉ?' : 'Clear entire cart?')) {
      await clearCart();
    }
  };

  // Show loading state while cart is being fetched
  if (loading) {
    return (
      <div className="cart-loading">
        <div className="spinner"></div>
        <p>{isAmharic ? 'እባክዎ ይጠብቁ...' : 'Loading your cart...'}</p>
      </div>
    );
  }

  // Safely check if cart exists and has items
  const cartItems = cart?.items || [];
  const cartSubtotal = cart?.subtotal || 0;

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>{isAmharic ? 'ጋሪዎ ባዶ ነው' : 'Your Cart is Empty'}</h2>
        <p>{isAmharic ? 'ምርቶችን ወደ ጋሪዎ ያክሉ' : 'Add some products to your cart'}</p>
        <Link to="/products" className="shop-now-btn">
          {isAmharic ? 'ወደ ግዢ ቀጥል' : 'Continue Shopping'}
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">{isAmharic ? 'የግዢ ጋሪ' : 'Shopping Cart'}</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-header">
              <div className="cart-col-product">{isAmharic ? 'ምርት' : 'Product'}</div>
              <div className="cart-col-price">{isAmharic ? 'ዋጋ' : 'Price'}</div>
              <div className="cart-col-quantity">{isAmharic ? 'ብዛት' : 'Quantity'}</div>
              <div className="cart-col-total">{isAmharic ? 'ጠቅላላ' : 'Total'}</div>
              <div className="cart-col-action"></div>
            </div>
            
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-product">
                  <img 
                    src={item.image || '/img/placeholder.jpg'} 
                    alt={item.nameEn || 'Product'} 
                    onError={(e) => { e.target.src = '/img/placeholder.jpg' }}
                  />
                  <div>
                    <h3>{isAmharic ? item.nameAm : item.nameEn}</h3>
                    <p className="cart-item-size">
                      {isAmharic ? 'መጠን' : 'Size'}: {item.size || 'M'}
                    </p>
                  </div>
                </div>
                <div className="cart-item-price">
                  ETB {(item.price || 0).toLocaleString()}
                </div>
                <div className="cart-item-quantity">
                  <button 
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    disabled={updatingId === item._id}
                  >
                    -
                  </button>
                  <span>{item.quantity || 0}</span>
                  <button 
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    disabled={updatingId === item._id}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  ETB {((item.price || 0) * (item.quantity || 0)).toLocaleString()}
                </div>
                <div className="cart-item-action">
                  <button 
                    onClick={() => handleRemoveItem(item._id)}
                    className="remove-btn"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
            
            <div className="cart-actions">
              <button onClick={handleClearCart} className="clear-cart-btn">
                {isAmharic ? 'ጋሪውን አጽዳ' : 'Clear Cart'}
              </button>
              <Link to="/products" className="continue-shopping-btn">
                {isAmharic ? 'ግዢ ቀጥል' : 'Continue Shopping'}
              </Link>
            </div>
          </div>
          
          <div className="cart-summary">
            <h3>{isAmharic ? 'ማጠቃለያ' : 'Order Summary'}</h3>
            <div className="summary-row">
              <span>{isAmharic ? 'የምርቶች ድምር' : 'Subtotal'}:</span>
              <span>ETB {cartSubtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>{isAmharic ? 'መላኪያ' : 'Shipping'}:</span>
              <span>{cartSubtotal > 2000 ? 'FREE' : 'ETB 150'}</span>
            </div>
            <div className="summary-row total">
              <span>{isAmharic ? 'ጠቅላላ' : 'Total'}:</span>
              <span>ETB {(cartSubtotal + (cartSubtotal > 2000 ? 0 : 150)).toLocaleString()}</span>
            </div>
            <Link to="/checkout" className="checkout-btn">
              {isAmharic ? 'ወደ ክፍያ ቀጥል' : 'Proceed to Checkout'}
            </Link>
            <p className="shipping-note">
              * {isAmharic ? 'ከ2000 ብር በላይ ትዕዛዝ ነጻ መላኪያ' : 'Free shipping on orders over 2000 ETB'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;