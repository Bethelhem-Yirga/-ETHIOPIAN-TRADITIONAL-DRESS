// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Kuta Collections</h3>
            <p>Ethiopian Traditional Clothing</p>
            <p>ዕደ ጥበብ ልብሶች</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📍 5th Floor, Jan Meda Dashin Bank Building</p>
            <p>📞 +2519xxxxxxxx</p>
            <p>✉️ info@kutacollections.com</p>
          </div>
          
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Telegram</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Kuta Collections. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;