// hooks/useTranslation.js
import { useLanguage } from '../contexts/LanguageContext';

export const useTranslation = () => {
  const { t, language, toggleLanguage } = useLanguage();
  
  return {
    t,
    language,
    toggleLanguage,
    isAmharic: language === 'am',
    isEnglish: language === 'en'
  };
};