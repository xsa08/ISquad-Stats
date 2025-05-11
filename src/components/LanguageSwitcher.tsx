'use client';

import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  const nextLanguage = language === 'ar' ? 'English' : 'العربية';

  return (
    <button
      onClick={toggleLanguage}
      className="border border-white text-white px-4 py-1 rounded-full transition hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
    >
      {nextLanguage}
    </button>
  );
}
