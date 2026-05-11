// src/contexts/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [cart, setCart] = useState({ items: [], subtotal: 0, totalItems: 0 });
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // Generate or get session ID
  useEffect(() => {
    let storedSessionId = localStorage.getItem('cartSessionId');
    if (!storedSessionId) {
      storedSessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('cartSessionId', storedSessionId);
    }
    setSessionId(storedSessionId);
  }, []);

  // Fetch cart on mount and when auth changes
  useEffect(() => {
    if (sessionId) {
      fetchCart();
    }
  }, [sessionId]);

  // Merge cart after login
  useEffect(() => {
    if (isAuthenticated && sessionId) {
      mergeCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    if (!sessionId) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        headers: {
          'x-session-id': sessionId,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setCart({
          items: data.cart.items || [],
          subtotal: data.cart.subtotal || 0,
          totalItems: data.cart.totalItems || 0
        });
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
      // Keep default empty cart state
      setCart({ items: [], subtotal: 0, totalItems: 0 });
    }
  };

  const addToCart = async (productId, quantity = 1, size = 'M') => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId, quantity, size })
      });
      const data = await response.json();
      if (data.success) {
        setCart({
          items: data.cart.items || [],
          subtotal: data.cart.subtotal || 0,
          totalItems: data.cart.totalItems || 0
        });
        return { success: true, message: 'Added to cart!' };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ quantity })
      });
      const data = await response.json();
      if (data.success) {
        setCart({
          items: data.cart.items || [],
          subtotal: data.cart.subtotal || 0,
          totalItems: data.cart.totalItems || 0
        });
      }
    } catch (error) {
      console.error('Update quantity error:', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'x-session-id': sessionId,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setCart({
          items: data.cart.items || [],
          subtotal: data.cart.subtotal || 0,
          totalItems: data.cart.totalItems || 0
        });
      }
    } catch (error) {
      console.error('Remove item error:', error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'DELETE',
        headers: {
          'x-session-id': sessionId,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setCart({
          items: data.cart.items || [],
          subtotal: data.cart.subtotal || 0,
          totalItems: data.cart.totalItems || 0
        });
      }
    } catch (error) {
      console.error('Clear cart error:', error);
    }
  };

  const mergeCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/merge', {
        method: 'POST',
        headers: {
          'x-session-id': sessionId,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setCart({
          items: data.cart.items || [],
          subtotal: data.cart.subtotal || 0,
          totalItems: data.cart.totalItems || 0
        });
      }
    } catch (error) {
      console.error('Merge cart error:', error);
    }
  };

  // Provide default values even before cart loads
  const cartValue = {
    cart: cart || { items: [], subtotal: 0, totalItems: 0 },
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems: cart?.totalItems || 0,
    subtotal: cart?.subtotal || 0,
    refreshCart: fetchCart
  };

  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
};