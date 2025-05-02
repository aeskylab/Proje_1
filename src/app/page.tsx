'use client';
import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import CategoryBar from '../components/CategoryBar/CategoryBar';
import ComparisonCard from '../components/ComparisonCard/ComparisonCard';

// Örnek ürün karşılaştırma verisi - gerçek ürün idleriyle
const comparisonData = [
  {
    id: 1,
    product1: {
      id: 101,
      name: 'iPhone 15 Pro',
      imageUrl: 'https://placehold.co/300x400/png?text=iPhone+15',
    },
    product2: {
      id: 102,
      name: 'Samsung Galaxy S24 Ultra',
      imageUrl: 'https://placehold.co/300x400/png?text=Galaxy+S24',
    },
  },
  {
    id: 2,
    product1: {
      id: 103,
      name: 'MacBook Pro M3',
      imageUrl: 'https://placehold.co/300x400/png?text=MacBook+Pro',
    },
    product2: {
      id: 104,
      name: 'Dell XPS 15',
      imageUrl: 'https://placehold.co/300x400/png?text=Dell+XPS',
    },
  },
  {
    id: 3,
    product1: {
      id: 105,
      name: 'Sony WH-1000XM5',
      imageUrl: 'https://placehold.co/300x400/png?text=Sony+WH',
    },
    product2: {
      id: 106,
      name: 'Apple AirPods Max',
      imageUrl: 'https://placehold.co/300x400/png?text=AirPods+Max',
    },
  },
  {
    id: 4,
    product1: {
      id: 107,
      name: 'iPad Pro 12.9"',
      imageUrl: 'https://placehold.co/300x400/png?text=iPad+Pro',
    },
    product2: {
      id: 108,
      name: 'Samsung Galaxy Tab S9 Ultra',
      imageUrl: 'https://placehold.co/300x400/png?text=Tab+S9',
    },
  },
  {
    id: 5,
    product1: {
      id: 109,
      name: 'Canon EOS R5',
      imageUrl: 'https://placehold.co/300x400/png?text=Canon+EOS',
    },
    product2: {
      id: 110,
      name: 'Sony A7 IV',
      imageUrl: 'https://placehold.co/300x400/png?text=Sony+A7',
    },
  },
  {
    id: 6,
    product1: {
      id: 111,
      name: 'Apple Watch Series 9',
      imageUrl: 'https://placehold.co/300x400/png?text=Apple+Watch',
    },
    product2: {
      id: 112,
      name: 'Samsung Galaxy Watch 6',
      imageUrl: 'https://placehold.co/300x400/png?text=Galaxy+Watch',
    },
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CategoryBar />
      
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Popüler Karşılaştırmalar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {comparisonData.map((comparison) => (
            <ComparisonCard
              key={comparison.id}
              product1={comparison.product1}
              product2={comparison.product2}
            />
          ))}
        </div>
      </section>
      
      <footer className="bg-gray-100 dark:bg-gray-900 mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 Ürün Karşılaştırma. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </main>
  );
}
