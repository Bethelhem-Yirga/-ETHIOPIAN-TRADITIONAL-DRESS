// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const { t, isAmharic } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const success = await login(formData);
    
    if (success) {
      navigate('/');
    } else {
      setError(isAmharic ? 'ኢሜል ወይም የይለፍ ቃል ስህተት ነው' : 'Invalid email or password');
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{isAmharic ? 'ግባ' : 'Welcome Back'}</h1>
            <p>{isAmharic ? 'እባክዎ ወደ መለያዎ ይግቡ' : 'Please login to your account'}</p>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder={isAmharic ? 'የይለፍ ቃልዎን ያስገቡ' : 'Enter your password'}
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>{isAmharic ? 'አስታውሰኝ' : 'Remember me'}</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                {isAmharic ? 'የይለፍ ቃል ረሳሁት?' : 'Forgot password?'}
              </Link>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? (
                <span className="spinner"></span>
              ) : (
                isAmharic ? 'ግባ' : 'Login'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isAmharic ? 'አዲስ መለያ የለዎትም?' : "Don't have an account?"}
              <Link to="/register">{isAmharic ? ' ይመዝገቡ' : ' Sign up'}</Link>
            </p>
          </div>

          <div className="auth-divider">
            <span>{isAmharic ? 'ወይም' : 'OR'}</span>
          </div>

          <div className="social-login">
            <button className="social-btn google">
              <span>G</span> Google
            </button>
            <button className="social-btn facebook">
              <span>f</span> Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;