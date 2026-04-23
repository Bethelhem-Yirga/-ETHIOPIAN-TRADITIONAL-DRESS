// App.js - Fixed Version
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import './App.css';

// Protected Route Component - Must be inside AuthProvider
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Main App Content - Must be inside all providers
function AppContent() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <div style={{ padding: '120px 20px 60px', textAlign: 'center' }}>
              <h1>Profile Page</h1>
              <p>Welcome, {user?.name}!</p>
              <p>Your profile page is coming soon...</p>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
      <Chatbot />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;