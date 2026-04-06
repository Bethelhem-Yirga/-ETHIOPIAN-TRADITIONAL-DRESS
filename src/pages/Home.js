import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, slides, newArrivals } from '../contexts/LanguageContext';
import './Home.css';

const Home = () => {
  const { t, isAmharic } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getSlideTitle = (slideNum) => t(`slide${slideNum}Title`);
  const getSlideSubtitle = (slideNum) => t(`slide${slideNum}Subtitle`);
  const getSlideHighlight = (slideNum) => t(`slide${slideNum}Highlight`);

  return (
    <div className="home-page">
      {/* Language Indicator */}
      <div className="language-indicator">
        {isAmharic ? '🇪🇹 በአማርኛ እየተመለከቱ ነው' : '🇬🇧 Viewing in English'}
      </div>

      {/* Hero Slider Section */}
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
              <span className="title-line line1">
                {getSlideTitle(slide.id)}
              </span>
              <br />
              <span className="title-line line2">
                {getSlideSubtitle(slide.id)}
              </span>
              <br />
              <span className="title-line line3 highlight">
                {getSlideHighlight(slide.id)}
              </span>
            </h2>
            <Link to="/products" className="shop-now-btn">{t('shopNow')}</Link>
          </div>
          <div className="slide-image">
            <img src={slide.image} alt={getSlideTitle(slide.id)} />
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
      />
    ))}
  </div>
  
  <div className="slider-arrows">
    <button className="arrow prev" onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}>❮</button>
    <button className="arrow next" onClick={() => goToSlide((currentSlide + 1) % slides.length)}>❯</button>
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
            {newArrivals.map((product) => (
              <div key={product.id} className="product-card">
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