'use client';
import Header from '@/app/_components/Header';
import Hero from '@/app/_components/Hero';
import { BudgetContext } from '@/context/BudgetContext';
import { useContext } from 'react';

export default function Home() {
  const { isDarkMode } = useContext(BudgetContext);

  return (
    <div
      className={`flex flex-col items-center w-full justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] ${
        isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <Header />
      <Hero />
    </div>
  );
}
