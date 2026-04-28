// components/Navbar.js - Add loading check
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { t, isAmharic } = useLanguage();
  const { isAuthenticated, user, logout, loading } = useAuth(); // Add loading
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', name: t('home') },
    { path: '/products', name: t('products') },
    { path: '/about', name: t('about') },
    { path: '/contact', name: t('contact') }
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // Show loading state
  if (loading) {
    return (
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="logo">
            KUTA<span>Collections</span>
          </Link>
          <div className="nav-menu">
            <div className="loading-placeholder"></div>
              <Link to="/cart" className="cart-icon">
    🛒
    {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
  </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          KUTA<span>Collections</span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <LanguageSwitcher />
          
          {isAuthenticated ? (
            <div className="user-menu-container">
              <button 
                className="user-menu-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
                <span className="user-name">{user?.name?.split(' ')[0] || 'User'}</span>
              </button>
              
              {showUserMenu && (
                <div className="user-dropdown">
                  <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                    👤 {isAmharic ? 'መገለጫ' : 'Profile'}
                  </Link>
                  <Link to="/orders" onClick={() => setShowUserMenu(false)}>
                    📦 {isAmharic ? 'ትዕዛዞች' : 'My Orders'}
                  </Link>
                  <button onClick={handleLogout}>
                    🚪 {isAmharic ? 'ውጣ' : 'Logout'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-login-btn">
                {isAmharic ? 'ግባ' : 'Login'}
              </Link>
              <Link to="/register" className="nav-register-btn">
                {isAmharic ? 'ተመዝገብ' : 'Sign Up'}
              </Link>
            </div>
          )}
        </div>

        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;