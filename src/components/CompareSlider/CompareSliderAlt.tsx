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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // localStorage'dan ürünleri yükle
    try {
      const savedList = localStorage.getItem('compareList');
      if (savedList) {
        const parsedList = JSON.parse(savedList);
        setProducts(parsedList);
        // İlk öğeyi seç
        setSelectedIndex(0);
      }
    } catch (err) {
      console.error('LocalStorage okuma hatası:', err);
    }
  }, []);

  useEffect(() => {
    // Seçili öğeyi merkeze getir
    if (scrollContainerRef.current && products.length > 0) {
      const itemHeight = 128; // Yaklaşık öğe yüksekliği (8rem)
      scrollContainerRef.current.scrollTop = selectedIndex * itemHeight;
    }
  }, [products, selectedIndex]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const itemHeight = 128; // Öğe yüksekliği
    
    // Kaydırma konumuna göre merkezdeki öğeyi belirle
    const scrollPosition = container.scrollTop;
    const newIndex = Math.round(scrollPosition / itemHeight);
    
    // Geçerli indeks aralığını kontrol et
    if (newIndex >= 0 && newIndex < products.length && newIndex !== selectedIndex) {
      setSelectedIndex(newIndex);
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-gray-600 dark:text-gray-400">Karşılaştırma listesi boş</p>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col items-center">
      {/* Merkez vurgu şeridi */}
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-32 bg-gray-100/30 dark:bg-gray-800/30 border-y border-gray-200 dark:border-gray-700 z-10 pointer-events-none"></div>
      
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full max-w-md h-[70vh] overflow-y-auto scrollbar-hide scroll-smooth snap-y snap-mandatory"
      >
        {/* Başlangıç için boş alan */}
        <div className="h-[35vh] md:h-[30vh]"></div>
        
        {products.map((product, index) => {
          const isSelected = index === selectedIndex;
          
          return (
            <div 
              key={product.id}
              className={`snap-center flex flex-col items-center my-4 py-4 px-4 transition-all duration-300 ${
                isSelected 
                  ? 'scale-100 opacity-100' 
                  : 'scale-75 opacity-50'
              }`}
            >
              <div className="relative mb-3">
                <Image 
                  src={product.image_url || `https://placehold.co/200x200/png?text=${encodeURIComponent(product.name)}`}
                  alt={product.name}
                  width={isSelected ? 120 : 80}
                  height={isSelected ? 120 : 80}
                  className="object-contain rounded-md"
                />
              </div>
              
              <h3 className="text-center font-semibold text-gray-800 dark:text-white truncate w-full">
                {product.name}
              </h3>
              
              <p className="text-blue-600 dark:text-blue-400 font-medium">
                {product.price.toLocaleString('tr-TR')} ₺
              </p>
            </div>
          );
        })}
        
        {/* Bitiş için boş alan */}
        <div className="h-[35vh] md:h-[30vh]"></div>
      </div>
    </div>
  );
};

export default CompareSlider; 