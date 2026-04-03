// pages/Contact.js
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
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
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  // Jan Meda Dashin Bank Building coordinates (approximate location in Addis Ababa)
  const mapLocation = {
    lat: 9.0320,
    lng: 38.7468,
    address: "Jan Meda Dashin Bank Building, Addis Ababa, Ethiopia"
  };

  // Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(mapLocation.address)}`;
  
  // Alternative: Use a static map image (no API key required for basic map)
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${mapLocation.lat},${mapLocation.lng}&zoom=15&size=800x400&markers=color:red%7C${mapLocation.lat},${mapLocation.lng}&key=YOUR_API_KEY`;

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">አግኙን</p>
          <p className="contact-description">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        
        <div className="contact-wrapper">
          <div className="contact-content">
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">📍</div>
                <div className="info-details">
                  <h3>Visit Our Showroom</h3>
                  <p>33th Floor, Jan Meda Dashin Bank Building<br />Addis Ababa, Ethiopia</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">📞</div>
                <div className="info-details">
                  <h3>Call Us</h3>
                  <p>+2519xxxxxxxx<br />+2519xxxxxxxx</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">✉️</div>
                <div className="info-details">
                  <h3>Email</h3>
                  <p>info@hacollections.com<br />sales@hacollections.com</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">🕐</div>
                <div className="info-details">
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM<br />
                     Saturday: 10:00 AM - 4:00 PM<br />
                     Sunday: Closed</p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="social-media">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="#" className="social-icon">📘</a>
                  <a href="#" className="social-icon">📷</a>
                  <a href="#" className="social-icon">🐦</a>
                  <a href="#" className="social-icon">💬</a>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name / ስም</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email / ኢሜል</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message / መልእክት</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn">
                  Send Message ✨
                </button>
              </form>
            </div>
          </div>
          
          {/* Google Map Section */}
          <div className="map-container">
            <h3>Find Us on Map</h3>
            <div className="map-wrapper">
              {/* Option 1: Google Maps Iframe (requires API key for best results) */}
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
              
              {/* Fallback: OpenStreetMap (no API key required) */}
              {/* <iframe
                title="KUTA Collections Location - OpenStreetMap"
                src="https://www.openstreetmap.org/export/embed.html?bbox=38.7268%2C9.0120%2C38.7668%2C9.0520&layer=mapnik&marker=9.0320%2C38.7468"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe> */}
            </div>
            <div className="map-address">
              <p>📍 <strong>Jan Meda Dashin Bank Building</strong>, 33rd Floor, Addis Ababa, Ethiopia</p>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapLocation.lat},${mapLocation.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="directions-btn"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;