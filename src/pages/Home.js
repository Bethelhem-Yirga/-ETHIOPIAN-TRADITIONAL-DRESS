import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
     
      id: 1,
      title: "Elegant",
      subtitle: "traditional",
      highlight: "Habesha kemis",
      image: "img/habesha1.png",
      bgColor: "#f5e6d3"
    },
    {
      id: 2,
      title: "Luxurious",
      subtitle: "royal",
      highlight: "collection",
      image: "img/cotton.png",
      bgColor: "#e8d5c4"
    },
    {
      id: 3,
      title: "ethiopian",
      subtitle: "heritage",
      highlight: "pride",
      image: "img/habesha2.png",
      bgColor: "#f0e0d0"
    }
  ];


  const newArrivals = [
    {
      id: 1,
      name: "Habesha Kemis",
      price: "3500",
      image: "img/habesha1.png",
      isNew: true
    },
    {
      id: 2,
      name: "Habesha Man Traditional Cloth",
      price: "3000",
      image: "img/mens.jpg",
      isNew: true
    },
    {
      id: 3,
      name: "Netela Scarf",
      price: "500",
      image: "img/netela.jpg",
      isNew: true
    },
    {
      id: 4,
      name: "Habesha Man Traditional Cloth",
      price: "3000",
      image: "img/m4.jpg",
      isNew: false
    },
    {
      id: 5,
      name: "Tilfi",
      price: "1800",
      image: "img/telf.jpg",
      isNew: false
    },
    {
      id: 6,
      name: "Wedding Dress",
      price: "5000",
      image: "img/wd.jpg",
      isNew: false
    },
    {
      id: 7,
      name: "Habesha Man Traditional Cloth",
      price: "3000",
      image: "img/mens3.jpg",
      isNew: false
    },
    {
      id: 8,
      name: "Embroidered Scarf",
      price: "500",
      image: "img/scarf.jpg",
      isNew: false
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home-page">
      {/* Hero Slider Section */}
      <section className="hero-slider">
        <div className="slider-container">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundColor: slide.bgColor }}
            >
              <div className="slide-content">
                <div className="slide-text">
                  <h2 className="slide-title">
                    {slide.title}
                    <br />
                    <span className="subtitle">{slide.subtitle}</span>
                    <br />
                    <span className="highlight">{slide.highlight}</span>
                  </h2>
                  <Link to="/products" className="shop-now-btn">Shop Now</Link>
                </div>
                <div className="slide-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slider Navigation */}
        <div className="slider-nav">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        
        <div className="slider-arrows">
          <button className="arrow prev" onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}>
            ❮
          </button>
          <button className="arrow next" onClick={() => goToSlide((currentSlide + 1) % slides.length)}>
            ❯
          </button>
        </div>
      </section>

  

      {/* New Arrivals Section */}
      <section className="new-arrivals">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">new</span>
            <h2 className="section-title">arrival</h2>
          </div>
          
          <div className="products-grid">
            {newArrivals.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.isNew && <span className="new-badge">New</span>}
                  <div className="product-overlay">
                    <button className="quick-view">Quick View</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">{product.price} birr</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="browse-more">
            <Link to="/products" className="browse-btn">Browse More →</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>collection houses our first-ever</h2>
              <h3>About Us</h3>
              <p>
              Kuta Collections is dedicated to preserving and celebrating Ethiopian 
              traditional craftsmanship. Each piece in our collection is handwoven 
              by skilled artisans, using techniques passed down through generations.
              </p>
              <Link to="/about" className="read-more">Read More →</Link>
            </div>
            <div className="about-image">
              <img 
                src="img/habeshkemis.jpg" 
                alt="About KUTA Collections"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🚚</div>
              <h4>Fast & Free Delivery</h4>
              <p>Free delivery on all orders</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <h4>Secure Payment</h4>
              <p>100% secure transactions</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⭐</div>
              <h4>Quality Guarantee</h4>
              <p>Authentic handwoven products</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <h4>Easy Returns</h4>
              <p>7-day return policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;