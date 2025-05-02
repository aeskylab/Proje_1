'use client';

import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Ürün Karşılaştırma Logo" 
            width={48} 
            height={48} 
            className="rounded-full" 
          />
          <span className="ml-2 font-semibold text-lg text-gray-800 dark:text-white">Ürün Karşılaştırma</span>
        </Link>

        {/* Arama Çubuğu */}
        <div className="flex-1 max-w-xl mx-6">
          <div className="relative">
            <input
              type="text"
              placeholder="iPhone 15 vs Galaxy S24"
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              aria-label="Ara"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Giriş Butonu */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
          Giriş Yap
        </button>
      </div>
    </header>
  );
};

export default Header; 