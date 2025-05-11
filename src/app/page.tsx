'use client';

import FileUploadBox from "../components/FileUploadBox";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-4">
        {language === 'ar' ? 'مرحبًا بك في ISquad Stats 🚀' : 'Welcome to ISquad Stats 🚀'}
      </h1>
      <p className="text-lg mb-8">
        {language === 'ar'
          ? 'ابدأ برفع ملف البيانات لتحليله.'
          : 'Start by uploading your data file for analysis.'}
      </p>
      <FileUploadBox />
    </main>
  );
}



