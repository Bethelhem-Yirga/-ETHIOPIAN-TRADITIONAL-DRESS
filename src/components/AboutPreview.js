// components/AboutPreview.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPreview.css';

const AboutPreview = () => {
  return (
    <section className="about-preview">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p className="amharic-text">የእኛ ታሪክ</p>
            <p>
              Kuta Collections is dedicated to preserving and celebrating Ethiopian 
              traditional craftsmanship. Each piece in our collection is handwoven 
              by skilled artisans, using techniques passed down through generations.
            </p>
            <p>
              Located on the 5th floor of Jan Meda Dashin Bank Building, our showroom 
              offers a unique shopping experience where tradition meets elegance.
            </p>
            <Link to="/about" className="learn-more">Learn More →</Link>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3" 
              alt="Ethiopian traditional weaving"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;