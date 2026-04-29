// src/contexts/AuthContext.js - Fix the register function
import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (authService.isAuthenticated()) {
      const userData = await authService.getCurrentUser();
      if (userData) {
        setUser(userData);
      } else {
        authService.logout();
      }
    }
    setLoading(false);
  };

  const register = async (userData) => {
    setError(null);
    try {
      const response = await authService.register(userData);
      console.log('Register response in context:', response);
      
      if (response.success) {
        setUser(response.user);
        return true;
      } else {
        setError(response.message);
        return false;
      }
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const login = async (credentials) => {
    setError(null);
    try {
      const response = await authService.login(credentials);
      console.log('Login response in context:', response);
      
      if (response.success) {
        setUser(response.user);
        return true;
      } else {
        setError(response.message);
        return false;
      }
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (userData) => {
    const response = await authService.updateProfile(userData);
    if (response.success) {
      setUser(response.user);
      return true;
    }
    return false;
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};