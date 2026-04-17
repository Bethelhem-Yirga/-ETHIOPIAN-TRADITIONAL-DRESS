import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    { icon: '🚚', title: 'Fast Delivery', desc: 'Quick delivery across Ethiopia' },
    { icon: '💰', title: 'Free Shipping', desc: 'Free shipping on orders over 2000 ETB' },
    { icon: '⭐', title: 'Best Quality', desc: '100% authentic handwoven products' }
  ];

  return (
    <section className="features">
      <div className="container">
        <h2 className="section-title">Why Shop With Us</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;