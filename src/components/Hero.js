// components/Hero.js - Updated
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Hero.css';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              {t('heroBadge')}
            </div>
            <h1 className="hero-title">
              {t('heroTitle')}
              <span>{t('heroTitleHighlight')}</span>
            </h1>
            <p className="hero-description">
              {t('heroDescription')}
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn-primary">
                {t('shopNow')} 🛍️
              </Link>
              <Link to="/about" className="btn-secondary">
                {t('learnMore')} →
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">5000+</span>
                <span className="stat-label">{t('happyCustomers')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">200+</span>
                <span className="stat-label">{t('uniqueDesigns')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">{t('skilledArtisans')}</span>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3" 
                alt="Ethiopian Traditional Clothing"
              />
              <div className="floating-card">
                <span className="emoji">⭐</span>
                <p>4.9 Rating (500+ reviews)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;