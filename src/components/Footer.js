// components/Footer.js - Fixed (removed unused variables)
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t, isAmharic } = useLanguage();// Removed unused isAmharic and toggleLanguage

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>KUTA Collections</h3>
            <p>{isAmharic ? "የኢትዮጵያ ባህላዊ አልባሳት" : "Ethiopian Traditional Clothing"}</p>
            <p>{isAmharic ? "በፍቅር እና በባህላዊ ቅርስ በጥበብ የተሰሩ" : "Handcrafted with love and cultural heritage"}</p>
          </div>
          
          <div className="footer-section">
            <h4>{t('quickLinks')}</h4>
            <ul>
              <li><Link to="/">{t('home')}</Link></li>
              <li><Link to="/products">{t('products')}</Link></li>
              <li><Link to="/about">{t('about')}</Link></li>
              <li><Link to="/contact">{t('contact')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>{isAmharic ? "አድራሻ" : "Contact Info"}</h4>
            <p>{isAmharic ? "📍 5ኛ ፎቅ፣ ጃን ሜዳ ዳሽን ባንክ ሕንፃ" : "📍 5th Floor, Jan Meda Dashin Bank Building"}</p>
            <p>{isAmharic ? "አዲስ አበባ, ኢትዮጵያ" : "Addis Ababa, Ethiopia"}</p>
            <p>{isAmharic ? "📞 +2519xxxxxxxx" : "📞 +2519xxxxxxxx"}</p>
            <p>{isAmharic ? "✉️ info@kutacollections.com" : "✉️ info@kutacollections.com"}</p>
          </div>
          
          <div className="footer-section">
            <h4>{isAmharic ? "ይከተሉን" : "Follow Us"}</h4>
            <div className="social-links">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                📘
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                📷
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a 
                href="https://telegram.org" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                💬
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 KUTA Collections. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;