// pages/Contact.js - Fixed Version
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Contact.css';

const Contact = () => {
  const { t, isAmharic } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isAmharic ? 'ለመልእክትዎ እናመሰግናለን! በቅርቡ እንመልሳለን።' : 'Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  // Jan Meda Dashin Bank Building coordinates
  const mapLocation = {
    lat: 9.0320,
    lng: 38.7468,
    address: isAmharic ? "የጃን ሜዳ ዳሽን ባንክ ህንጻ" : "Jan Meda Dashin Bank Building"
  };

  // Social media click handlers (since no real links yet)
  const handleSocialClick = (platform) => {
    alert(isAmharic ? `${platform} ገጽ በቅርቡ ይመጣል!` : `${platform} page coming soon!`);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1 className="page-title">{t('contact')}</h1>
          <p className="contact-description">
            {isAmharic ? "ጥያቄዎች አሉዎት? ከእርስዎ መስማት እንወዳለን። መልዕክት ይላኩልን እና በተቻለን ፍጥነት ምላሽ እንሰጣለን።" : "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
          </p>
        </div>
        
        <div className="contact-wrapper">
          <div className="contact-content">
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">📍</div>
                <div className="info-details">
                  <h3>{isAmharic ? "የንግድ ቦታ" : "Visit Our Showroom"}</h3>
                  <p>{isAmharic ? "33ኛ ፎቅ፣ የጃን ሜዳ ዳሽን ባንክ ህንጻ አዲስ አበባ" : "33rd Floor, Jan Meda Dashin Bank Building, Addis Ababa, Ethiopia"}</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">📞</div>
                <div className="info-details">
                  <h3>{isAmharic ? "ይደውሉ" : "Call Us"}</h3>
                  <p>+2519xxxxxxxx<br />+2519xxxxxxxx</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">✉️</div>
                <div className="info-details">
                  <h3>{isAmharic ? "ኢሜል" : "Email"}</h3>
                  <p>info@kutacollections.com<br />sales@kutacollections.com</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">🕐</div>
                <div className="info-details">
                  <h3>{isAmharic ? "የንግድ ሰዓት" : "Business Hours"}</h3>
                  <p>{isAmharic ? "ሰኞ - አርብ : 9:00 - 18:00" : "Monday - Friday: 9:00 AM - 6:00 PM"}</p>
                  <p>{isAmharic ? "ቅዳሜ: 10:00 - 16:00" : "Saturday: 10:00 AM - 4:00 PM"}</p>
                  <p>{isAmharic ? "እሁድ: ተዘግቷል" : "Sunday: Closed"}</p>
                </div>
              </div>

              {/* Social Media Links - Fixed: changed from <a> to <button> */}
              <div className="social-media">
                <h3>{isAmharic ? "ይከተሉ" : "Follow Us"}</h3>
                <div className="social-icons">
                  <button 
                    className="social-icon" 
                    onClick={() => handleSocialClick('Facebook')}
                    aria-label="Facebook"
                  >
                    📘
                  </button>
                  <button 
                    className="social-icon" 
                    onClick={() => handleSocialClick('Instagram')}
                    aria-label="Instagram"
                  >
                    📷
                  </button>
                  <button 
                    className="social-icon" 
                    onClick={() => handleSocialClick('Twitter')}
                    aria-label="Twitter"
                  >
                    🐦
                  </button>
                  <button 
                    className="social-icon" 
                    onClick={() => handleSocialClick('Telegram')}
                    aria-label="Telegram"
                  >
                    💬
                  </button>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">{t('name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={isAmharic ? "ስምዎን ያስገቡ" : "Enter your name"}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">{t('email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={isAmharic ? "ኢሜልዎን ያስገቡ" : "Enter your email"}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">{t('message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder={isAmharic ? "መልእክትዎን ይጻፉ" : "Write your message"}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn">
                  {t('sendMessage')} ✨
                </button>
              </form>
            </div>
          </div>
          
          {/* Google Map Section */}
          <div className="map-container">
            <h3>{isAmharic ? "ለመገኛችን ካርታውን ይመልከቱ" : "Find Us on Map"}</h3>
            <div className="map-wrapper">
              <iframe
                title="KUTA Collections Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.442527668465!2d38.744573!3d9.032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f3b2b7b6b3%3A0x8a5a5a5a5a5a5a5a!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="map-address">
              <p>📍 <strong>{isAmharic ? "የጃን ማዳ ዳሽን ባንክ ህንጻ" : "Jan Meda Dashin Bank Building"}</strong> {isAmharic ? ", 33ኛ ፎቅ፣ አዲስ አበባ፣ ኢትዮጵያ" : ", 33rd Floor, Addis Ababa, Ethiopia"}</p>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapLocation.lat},${mapLocation.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="directions-btn"
              >
                {isAmharic ? "አቅጣጫ ያግኙ →" : "Get Directions →"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;