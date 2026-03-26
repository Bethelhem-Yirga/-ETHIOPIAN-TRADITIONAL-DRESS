// pages/About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="page-title">About Kuta Collections</h1>
        <p className="page-subtitle">ስለ እኛ</p>
        
        <div className="about-story">
          <div className="story-content">
            <h2>Our Heritage</h2>
            <p>
              Kuta Collections was founded with a vision to preserve and promote Ethiopian 
              traditional craftsmanship. We believe that every handwoven piece tells a story 
              of our rich cultural heritage, passed down through generations of skilled artisans.
            </p>
            <p>
              Our name "Kuta" (ኩታ) represents the traditional Ethiopian clothing that has 
              been worn for centuries, symbolizing our identity, pride, and connection to our roots.
            </p>
          </div>
          
          <div className="mission-vision">
            <div className="mission">
              <h3>Our Mission</h3>
              <p>
                To preserve Ethiopian traditional weaving techniques while creating modern, 
                elegant pieces that can be worn with pride in any setting.
              </p>
            </div>
            <div className="vision">
              <h3>Our Vision</h3>
              <p>
                To become the leading Ethiopian traditional clothing brand, recognized globally 
                for quality, authenticity, and cultural preservation.
              </p>
            </div>
          </div>
          
          <div className="values">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h4>Quality</h4>
                <p>We use only the finest materials and traditional weaving techniques</p>
              </div>
              <div className="value-card">
                <h4>Authenticity</h4>
                <p>Each piece is handcrafted by skilled Ethiopian artisans</p>
              </div>
              <div className="value-card">
                <h4>Sustainability</h4>
                <p>We support local artisans and sustainable practices</p>
              </div>
              <div className="value-card">
                <h4>Cultural Pride</h4>
                <p>We celebrate and preserve Ethiopian heritage through fashion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;