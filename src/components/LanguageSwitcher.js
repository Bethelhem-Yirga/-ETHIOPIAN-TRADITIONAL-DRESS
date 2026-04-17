// components/LanguageSwitcher.js
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button 
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => language !== 'en' && toggleLanguage()}
      >
        🇬🇧 EN
      </button>
      <button 
        className={`lang-btn ${language === 'am' ? 'active' : ''}`}
        onClick={() => language !== 'am' && toggleLanguage()}
      >
        🇪🇹 አማ
      </button>
    </div>
  );
};

export default LanguageSwitcher;