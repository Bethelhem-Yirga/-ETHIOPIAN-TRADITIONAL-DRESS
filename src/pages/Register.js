// src/pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Auth.css';

const Register = () => {
  const { register } = useAuth();
  const { t, isAmharic } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = isAmharic ? 'ስም ቢያንስ 2 ፊደላት መሆን አለበት' : 'Name must be at least 2 characters';
    }
    
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = isAmharic ? 'እባክዎ ትክክለኛ ኢሜል ያስገቡ' : 'Please enter a valid email';
    }
    
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = isAmharic ? 'የይለፍ ቃል ቢያንስ 6 ቁምፊዎች መሆን አለበት' : 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = isAmharic ? 'የይለፍ ቃሎች አይዛመዱም' : 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    const { confirmPassword, ...userData } = formData;
    const success = await register(userData);
    
    if (success) {
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{isAmharic ? 'ተመዝገብ' : 'Create Account'}</h1>
            <p>{isAmharic ? 'እባክዎ መረጃዎን ይሙሉ' : 'Please fill your information'}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">
                {isAmharic ? 'ሙሉ ስም' : 'Full Name'}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={isAmharic ? 'ስምዎን ያስገቡ' : 'Enter your name'}
                required
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                {isAmharic ? 'ኢሜል' : 'Email Address'}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={isAmharic ? 'ኢሜልዎን ያስገቡ' : 'Enter your email'}
                required
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                {isAmharic ? 'ስልክ ቁጥር' : 'Phone Number'}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={isAmharic ? 'ስልክ ቁጥርዎን ያስገቡ' : 'Enter your phone number'}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                {isAmharic ? 'የይለፍ ቃል' : 'Password'}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={isAmharic ? 'የይለፍ ቃልዎን ያስገቡ' : 'Create a password'}
                required
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                {isAmharic ? 'የይለፍ ቃል ድገም' : 'Confirm Password'}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={isAmharic ? 'የይለፍ ቃልዎን ያረጋግጡ' : 'Confirm your password'}
                required
              />
              {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
            </div>

            <div className="form-terms">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>
                  {isAmharic ? 'ውሎች እና ሁኔታዎችን ተቀብያለሁ' : 'I agree to the Terms and Conditions'}
                </span>
              </label>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? (
                <span className="spinner"></span>
              ) : (
                isAmharic ? 'ተመዝገብ' : 'Register'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isAmharic ? 'አስቀድመው መለያ አለዎት?' : 'Already have an account?'}
              <Link to="/login">{isAmharic ? ' ግባ' : ' Login'}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;