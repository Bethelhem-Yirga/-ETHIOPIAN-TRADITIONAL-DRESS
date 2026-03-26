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

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-subtitle">አግኙን</p>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Visit Our Showroom</h3>
            <p className="address">
              📍 5th Floor, Jan Meda Dashin Bank Building<br />
              Addis Ababa, Ethiopia
            </p>
            
            <h3>Call Us</h3>
            <p>📞 +2519xxxxxxxx</p>
            <p>📞 +2519xxxxxxxx</p>
            
            <h3>Email</h3>
            <p>✉️ info@kutacollections.com</p>
            <p>✉️ sales@kutacollections.com</p>
            
            <h3>Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
          
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name / ስም</label>
                <input
                  type="text"
                  id="name"
                  name="name"
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
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                Send Message / መልእክት ላክ
              </button>
            </form>
          </div>
        </div>
        
        <div className="map-container">
          <h3>Find Us</h3>
          <div className="map-placeholder">
            <p>📍 Jan Meda Dashin Bank Building, 5th Floor</p>
            <p>Google Maps Location will be embedded here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;