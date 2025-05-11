'use client';
import { useLanguage } from '../context/LanguageContext';
import { Mail } from 'lucide-react';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="w-full bg-gradient-to-t from-[#1a1c2e]/80 to-[#0f0c29]/60 backdrop-blur-md border-t border-white/10 py-10 mt-24 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 text-center text-white space-y-4">
        <h3 className="text-lg font-semibold tracking-wide">
          {language === 'ar'
            ? 'ISquad Stats ©2025 تم تطويره بواسطة'
            : 'Developed by ISquad Stats © 2025'}
        </h3>
        <div className="flex justify-center items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-pink-300" />
          <span>
            {language === 'ar' ? 'للتواصل: ' : 'Contact us:'}
            <a
              href="mailto:isquadstats@gmail.com"
              className="ml-1 underline text-pink-300 hover:text-pink-400 transition"
            >
              isquadstats@gmail.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
