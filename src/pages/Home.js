import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, slides, newArrivals } from '../contexts/LanguageContext';
import './Home.css';

const Home = () => {
  const { t, isAmharic } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getSlideTitle = (slideNum) => t(`slide${slideNum}Title`);
  const getSlideSubtitle = (slideNum) => t(`slide${slideNum}Subtitle`);
  const getSlideHighlight = (slideNum) => t(`slide${slideNum}Highlight`);

  return (
    <div className="home-page">
      {/* Custom Cursor */}
      <div 
        className="custom-cursor" 
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          opacity: mousePosition.x > 0 ? 1 : 0
        }}
      >
        <div className="cursor-dot"></div>
        <div className="cursor-ring"></div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress">
        <div className="scroll-progress-bar" style={{ width: `${(scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}></div>
      </div>

      {/* Language Indicator */}
      <div className="language-indicator">
        {isAmharic ? '🇪🇹 በአማርኛ እየተመለከቱ ነው' : '🇬🇧 Viewing in English'}
      </div>

      {/* Hero Slider Section */}
      <section className="hero-slider">
        <div className="slider-container">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundColor: slide.bgColor }}
            >
              {/* Animated Background Particles */}
              <div className="particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
              </div>
              
              {/* Animated Background Waves */}
              <div className="waves">
                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
              </div>
              
              {/* Animated Corner Decorations */}
              <div className="corner-decoration top-left"></div>
              <div className="corner-decoration top-right"></div>
              <div className="corner-decoration bottom-left"></div>
              <div className="corner-decoration bottom-right"></div>
              
              {/* Floating Shapes */}
              <div className="floating-shapes">
                <div className="shape shape1">✦</div>
                <div className="shape shape2">✧</div>
                <div className="shape shape3">★</div>
                <div className="shape shape4">✿</div>
              </div>
              
              <div className="slide-content">
                <div className="slide-text">
                  <div className="animated-badge">
                    <span className="badge-text">✨ NEW COLLECTION ✨</span>
                    <span className="badge-pulse"></span>
                  </div>
                  <h2 className="slide-title">
                    <span className="title-line line1">
                      {getSlideTitle(slide.id)}
                      <span className="line-decoration"></span>
                    </span>
                    <br />
                    <span className="title-line line2">
                      {getSlideSubtitle(slide.id)}
                      <span className="line-decoration"></span>
                    </span>
                    <br />
                    <span className="title-line line3 highlight">
                      {getSlideHighlight(slide.id)}
                      <span className="line-decoration"></span>
                    </span>
                  </h2>
                  <div className="button-wrapper">
                    <Link to="/products" className="shop-now-btn">
                      <span>{t('shopNow')}</span>
                      <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="slide-image">
                  <div className="image-wrapper">
                    <img src={slide.image} alt={getSlideTitle(slide.id)} />
                    <div className="image-shine"></div>
                    <div className="image-border"></div>
                    <div className="image-glow"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="slider-nav">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <span className="dot-tooltip">Slide {index + 1}</span>
              <span className="dot-progress"></span>
            </button>
          ))}
        </div>
        
        <div className="slider-arrows">
          <button className="arrow prev" onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className="arrow next" onClick={() => goToSlide((currentSlide + 1) % slides.length)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="slider-progress">
          <div className="progress-bar" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}></div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t('new')}</span>
            <h2 className="section-title">{t('arrival')}</h2>
          </div>
          
          <div className="products-grid">
            {newArrivals.map((product, index) => (
              <div key={product.id} className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="product-image">
                  <img src={product.image} alt={isAmharic ? product.nameAm : product.nameEn} />
                  {product.isNew && <span className="new-badge">{t('newArrival')}</span>}
                  <div className="product-overlay">
                    <button className="quick-view">{t('quickView')}</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{isAmharic ? product.nameAm : product.nameEn}</h3>
                  <p className="product-price">{product.price} {t('birr')}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="browse-more">
            <Link to="/products" className="browse-btn">{t('browseMore')} →</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>{isAmharic ? 'የኩታ ስብስቦች የመጀመሪያ ስብስብ' : 'Collection Houses Our First-Ever'}</h2>
              <h3>{t('about')}</h3>
              <p>
                {isAmharic 
                  ? 'ኩታ ስብስቦች የኢትዮጵያን ባህላዊ የእደ ጥበብ ስራ ለመጠበቅ እና ለማክበር ቆርጧል። በስብስባችን ውስጥ ያለ እያንዳንዱ ክፍል ከትውልድ ወደ ትውልድ በሚተላለፉ ቴክኒኮች በክህሎት ባለሞያዎች በእጅ የተሰራ ነው።'
                  : 'Kuta Collections is dedicated to preserving and celebrating Ethiopian traditional craftsmanship. Each piece in our collection is handwoven by skilled artisans, using techniques passed down through generations.'
                }
              </p>
              <Link to="/about" className="read-more">{t('readMore')} →</Link>
            </div>
            <div className="about-image">
              <img src="img/big.jpg" alt={isAmharic ? 'ስለ ኩታ ስብስቦች' : 'About KUTA Collections'} />
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
              <h4>{t('fastDelivery')}</h4>
              <p>{t('freeDelivery')}</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <h4>{t('securePayment')}</h4>
              <p>{t('securePaymentDesc')}</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⭐</div>
              <h4>{t('qualityGuarantee')}</h4>
              <p>{t('qualityGuaranteeDesc')}</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <h4>{t('easyReturns')}</h4>
              <p>{t('easyReturnsDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;