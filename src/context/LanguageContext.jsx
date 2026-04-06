import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let value = translations[lang];
    for (const key of keys) {
      if (value && value[key]) {
        value = value[key];
      } else {
        return keyPath;
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
