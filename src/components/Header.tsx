'use client';

import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-transparent absolute top-0 left-0 z-[1000]">
      <div className="text-white font-bold text-2xl tracking-wide">
        ISquad Stats
      </div>
      <LanguageSwitcher />
    </header>
  );
}
