// components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content fade-in">
        <h1 className="hero-title">
          Kuta Collections
          <span className="hero-amharic">ዕደ ጥበብ ልብሶች</span>
        </h1>
        <p className="hero-description">
          Discover the finest Ethiopian traditional clothes, handcrafted with love and cultural heritage.
          Each piece tells a story of Ethiopian craftsmanship and tradition.
        </p>
        <div className="hero-buttons">
          <Link to="/products" className="btn-primary">Explore Collection</Link>
          <Link to="/contact" className="btn-secondary">Visit Us</Link>
        </div>
        <div className="hero-location">
          <p>📍 5th Floor, Jan Meda Dashin Bank Building, Addis Ababa, Ethiopia</p>
          <p>📞 +2519xxxxxxxx</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;