'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CompareSlider from '@/components/CompareSlider/CompareSlider';
import Header from '@/components/Header/Header';

export default function ComparePage() {
  const searchParams = useSearchParams();
  const product1Id = searchParams.get('p1');
  const product2Id = searchParams.get('p2');

  useEffect(() => {
    // Mock veri ile çalışıyoruz
    // Gerçek uygulamada burada API'dan ürün detayları çekilir
    if (product1Id && product2Id) {
      const product1 = {
        id: product1Id,
        name: `Ürün ${product1Id}`,
        price: 1000 + Math.random() * 5000,
        image_url: `https://placehold.co/300x400/png?text=Ürün+${product1Id}`
      };
      
      const product2 = {
        id: product2Id,
        name: `Ürün ${product2Id}`,
        price: 1000 + Math.random() * 5000,
        image_url: `https://placehold.co/300x400/png?text=Ürün+${product2Id}`
      };
      
      // Karşılaştırma listesini oluştur
      localStorage.setItem('compareList', JSON.stringify([product1, product2]));
    }
  }, [product1Id, product2Id]);

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4">
        <CompareSlider />
      </div>
    </main>
  );
} 