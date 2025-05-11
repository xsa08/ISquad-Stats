'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

const LanguageContext = createContext<{
  language: Language;
  toggleLanguage: () => void;
}>({
  language: 'ar',
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ar' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('language', nextLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
