import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-left">
            <h1>
              Sale 20% Off
              <span>On Everything</span>
            </h1>
            <p>
              Discover the finest Ethiopian traditional clothing, handcrafted with love 
              and cultural heritage. Each piece tells a story of Ethiopian craftsmanship.
            </p>
            <Link to="/products" className="btn-primary">Shop Now</Link>
          </div>
          <div className="hero-right">
            <img 
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3" 
              alt="Ethiopian Traditional Dress"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;