import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import { changeLanguage as changeLang, loadLanguage } from '../locales/i18n';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('ur');
  const [isRTL, setIsRTL] = useState(true);

  useEffect(() => {
    initializeLanguage();
  }, []);

  const initializeLanguage = async () => {
    try {
      await loadLanguage();
      const lang = i18n.language;
      setCurrentLanguage(lang);
      setIsRTL(lang === 'ur');
    } catch (error) {
      console.error('Error initializing language:', error);
    }
  };

  const changeLanguage = async (lang) => {
    try {
      await changeLang(lang);
      setCurrentLanguage(lang);
      setIsRTL(lang === 'ur');
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const toggleLanguage = async () => {
    const newLang = currentLanguage === 'ur' ? 'en' : 'ur';
    await changeLanguage(newLang);
  };

  const value = {
    currentLanguage,
    isRTL,
    changeLanguage,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

