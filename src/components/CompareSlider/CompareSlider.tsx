'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Karşılaştırma listesi için basitleştirilmiş ürün tipi
interface CompareProduct {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  category?: string;
}

const CompareSlider = () => {
  const [products, setProducts] = useState<CompareProduct[]>([]);
  const [centeredIndex, setCenteredIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // localStorage'dan ürünleri yükle
    try {
      const savedList = localStorage.getItem('compareList');
      if (savedList) {
        const parsedList = JSON.parse(savedList);
        setProducts(parsedList);
        // Ortadaki elemanı başlangıçta ayarla (varsa)
        if (parsedList.length > 0) {
          setCenteredIndex(Math.floor(parsedList.length / 2));
        }
      }
    } catch (err) {
      console.error('LocalStorage okuma hatası:', err);
    }
  }, []);

  useEffect(() => {
    // Başlangıç scroll pozisyonunu ayarla (varsa)
    const container = scrollContainerRef.current;
    if (container && products.length > 0) {
      const itemHeight = 128; // Tahmini item yüksekliği (10rem + padding/margin)
      const initialScroll = centeredIndex * itemHeight - (container.clientHeight / 2) + (itemHeight / 2);
      container.scrollTop = initialScroll;
    }
  }, [products, centeredIndex]); // Sadece ürünler yüklendiğinde çalışsın

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const itemHeight = 128; // Varsayılan item yüksekliği (h-32 = 8rem = 128px)
    const scrollCenter = container.scrollTop + container.clientHeight / 2;
    const newCenteredIndex = Math.round((container.scrollTop) / itemHeight);

    // Index'in sınırlar içinde kaldığından emin ol
    const validIndex = Math.max(0, Math.min(products.length - 1, newCenteredIndex));

    if (validIndex !== centeredIndex) {
        setCenteredIndex(validIndex);
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Karşılaştırma listesi boş.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 relative">
      {/* Ortadaki highlight alanı */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 bg-white/30 dark:bg-gray-700/30 border-y border-gray-300 dark:border-gray-600 pointer-events-none z-10"></div>
      
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Ürün Karşılaştırma</h1>

      <div 
        ref={scrollContainerRef} 
        onScroll={handleScroll}
        className="w-full max-w-sm h-[60vh] overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide relative"
      >
        {/* Başlangıç ve Bitiş için boşluklar (snap için) */}
        <div className="h-[calc(30vh-4rem)]"></div>
        
        {products.map((product, index) => {
          const isCentered = index === centeredIndex;
          const scale = isCentered ? 'scale-100' : 'scale-75';
          const opacity = isCentered ? 'opacity-100' : 'opacity-50';
          const imageSize = isCentered ? 'w-24 h-24' : 'w-16 h-16';

          return (
            <div
              key={product.id}
              className={`snap-center flex flex-col items-center justify-center h-32 px-4 py-2 transition-all duration-300 ease-out transform ${scale} ${opacity}`}
            >
              <div className="relative mb-2">
                <Image
                  src={product.image_url ? encodeURI(product.image_url.trim()) : `https://placehold.co/100x100/png?text=${encodeURIComponent(product.name)}`}
                  alt={product.name}
                  width={isCentered ? 96 : 64} // w-24 : w-16
                  height={isCentered ? 96 : 64} // h-24 : h-16
                  className={`object-contain transition-all duration-300 ${imageSize}`}
                />
              </div>
              <p className="font-semibold text-center truncate w-full text-gray-800 dark:text-white">{product.name}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {product.price.toLocaleString('tr-TR')} ₺
              </p>
            </div>
          );
        })}
        
        {/* Başlangıç ve Bitiş için boşluklar (snap için) */}
        <div className="h-[calc(30vh-4rem)]"></div>
      </div>
      
      {/* Seçilen ürün bilgisi (opsiyonel) */}
      {products[centeredIndex] && (
          <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-bold">Seçili Ürün</h3>
              <p>{products[centeredIndex].name}</p>
          </div>
      )}
    </div>
  );
};

export default CompareSlider; 