import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, getTranslation, getRoomName } from './translations';

const LanguageContext = createContext(null);

export const AVAILABLE_LANGUAGES = [
  { code: 'uz', label: "O'zbekcha", short: "UZ" },
  { code: 'ru', label: "Русский", short: "RU" },
  { code: 'en', label: "English", short: "EN" }
];

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('fishhouse_language');
    if (saved && (saved === 'uz' || saved === 'ru' || saved === 'en')) {
      return saved;
    }
    return 'uz';
  });

  const setLanguage = (langCode) => {
    if (['uz', 'ru', 'en'].includes(langCode)) {
      setLanguageState(langCode);
      localStorage.setItem('fishhouse_language', langCode);
    }
  };

  const t = (keyPath) => {
    return getTranslation(language, keyPath);
  };

  const tRoom = (name) => {
    return getRoomName(language, name);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tRoom, languages: AVAILABLE_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      language: 'uz',
      setLanguage: () => {},
      t: (keyPath) => getTranslation('uz', keyPath),
      tRoom: (name) => getRoomName('uz', name),
      languages: AVAILABLE_LANGUAGES
    };
  }
  return context;
}

