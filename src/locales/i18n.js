import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import en from './en.json';
import ur from './ur.json';
import { getLanguage, saveLanguage } from '../utils/storage';

const resources = {
  en: { translation: en },
  ur: { translation: ur },
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ur', // Default language
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

// Load saved language preference
export const loadLanguage = async () => {
  try {
    const savedLang = await getLanguage();
    if (savedLang) {
      await changeLanguage(savedLang);
    }
  } catch (error) {
    console.error('Error loading language:', error);
  }
};

// Change language
export const changeLanguage = async (lang) => {
  try {
    await i18n.changeLanguage(lang);
    await saveLanguage(lang);
    
    // Enable RTL for Urdu
    const isRTL = lang === 'ur';
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);
    }
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

export default i18n;

