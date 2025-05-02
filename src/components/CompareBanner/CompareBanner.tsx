'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';

// CompareSlider'dan ürün tipini alıyoruz
interface CompareProduct {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  category?: string;
}

export default function CompareBanner() {
  const [products, setProducts] = useState<CompareProduct[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    loadProducts();
    
    // Local storage'daki değişiklikleri dinle
    window.addEventListener("storage", handleStorageChange);
    
    // Özel olayları dinle
    window.addEventListener("compareListUpdated", loadProducts);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("compareListUpdated", loadProducts);
    };
  }, []);

  // Banner'ın yumuşak bir şekilde görünmesi için
  useEffect(() => {
    if (products.length > 0) {
      setIsAnimating(true);
      // Önce animasyon için görünür yap, sonra tam görünürlük için isVisible değiştir
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    } else {
      setIsVisible(false);
      // İsVisible false olduktan sonra animasyon tamamlanınca animating durumunu kapat
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  }, [products.length]);

  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === "compareList") {
      loadProducts();
    }
  };

  const loadProducts = () => {
    try {
      const storedList = localStorage.getItem("compareList");
      if (storedList) {
        const parsedList: CompareProduct[] = JSON.parse(storedList);
        setProducts(parsedList);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Karşılaştırma listesi yüklenemedi:", error);
      setProducts([]);
    }
  };

  const removeProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    
    localStorage.setItem("compareList", JSON.stringify(updatedProducts));
    
    // Özel olay tetikle
    const customEvent = new CustomEvent("compareListUpdated");
    window.dispatchEvent(customEvent);
  };

  if (!isAnimating && !isVisible) return null;

  // CSS sınıfları için koşullar
  const bannerClasses = `fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-2 z-50 transition-all duration-300 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`;

  return (
    <div className={bannerClasses}>
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-1 overflow-x-auto gap-4 items-center py-1 px-2">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="flex flex-col items-center min-w-[100px] max-w-[140px] scale-in" 
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <div className="relative w-16 h-16 mb-1">
                <Image
                  src={product.image_url ? encodeURI(product.image_url.trim()) : `https://placehold.co/100x100/png?text=${encodeURIComponent(product.name)}`}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <p className="text-xs font-medium text-center truncate w-full">{product.name}</p>
              <p className="text-xs font-bold text-blue-600">{product.price.toLocaleString('tr-TR')} TL</p>
              <button
                onClick={() => removeProduct(product.id)}
                className="text-xs text-red-500 hover:text-red-700 mt-1"
              >
                Kaldır
              </button>
            </div>
          ))}
        </div>
        
        <Link
          href="/compare"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap"
        >
          {products.length} Ürünü Karşılaştır
        </Link>
      </div>
    </div>
  );
} 