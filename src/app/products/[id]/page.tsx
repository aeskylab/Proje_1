'use client';

import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { isUUID } from 'validator';
import { useRouter } from 'next/navigation';
import supabase from '../../../lib/supabaseClient';
import { getProductById, Product } from '../../../services/productService';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Karşılaştırma listesi için basitleştirilmiş ürün tipi
interface CompareProduct {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  category?: string;
}

export const dynamic = 'force-dynamic'; // Her istekte sayfayı yeniden oluştur

function ProductDetailPage(props: ProductDetailPageProps) {
  const { id } = use(props.params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Ürünü getir
        const productData = await getProductById(id);
        
        if (!productData) {
          setError('Ürün bulunamadı');
          return;
        }
        
        setProduct(productData);
      } catch (err) {
        console.error('Ürün getirme hatası:', err);
        setError('Ürün yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  // Karşılaştırma listesine ekleme fonksiyonu
  const handleCompare = () => {
    if (!product) return;
    
    // Karşılaştırma için sadece gerekli alanları içeren basitleştirilmiş ürün nesnesi oluştur
    const compareProduct: CompareProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      category: product.category
    };
    
    // localStorage'dan mevcut listeyi al
    let compareList: CompareProduct[] = [];
    try {
      const savedList = localStorage.getItem('compareList');
      if (savedList) {
        compareList = JSON.parse(savedList);
      }
    } catch (err) {
      console.error('LocalStorage okuma hatası:', err);
      compareList = [];
    }
    
    // Ürün zaten listede mi kontrol et
    const productExists = compareList.some(item => item.id === compareProduct.id);
    
    if (!productExists) {
      // Ürünü listeye ekle
      const newList = [...compareList, compareProduct];
      
      // Güncel listeyi localStorage'a kaydet
      localStorage.setItem('compareList', JSON.stringify(newList));
      
      // Eğer listede 2 veya daha fazla ürün varsa karşılaştırma sayfasına yönlendir
      if (newList.length >= 2) {
        router.push('/compare');
      } else {
        alert('Ürün karşılaştırma listesine eklendi. Karşılaştırmak için en az bir ürün daha ekleyin.');
      }
    } else {
      alert('Bu ürün zaten karşılaştırma listenizde bulunuyor.');
    }
  };
  
  if (loading) {
    return <div className="container mx-auto px-4 py-8">Yükleniyor...</div>;
  }
  
  if (error || !product) {
    return notFound();
  }
  
  // Görüntü URL'si kontrolü
  const imageUrl = product.image_url || `https://placehold.co/600x400/png?text=${encodeURIComponent(product.name)}`;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Geri dönüş linki */}
      <div className="mb-6">
        <Link 
          href="/products" 
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Ürünlere Dön
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Ürün görseli */}
          <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="relative w-full h-96">
              {imageUrl.includes('placehold.co') ? (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
          
          {/* Ürün detayları */}
          <div className="md:w-1/2 p-8">
            {product.category && (
              <div className="text-blue-600 text-sm font-medium mb-2">
                {product.category}
              </div>
            )}
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
              {product.price.toLocaleString('tr-TR')} ₺
            </div>
            
            {product.description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Ürün Açıklaması</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {product.description}
                </p>
              </div>
            )}
            
            <div className="mt-auto">
              {/* Karşılaştır butonu */}
              <button 
                onClick={handleCompare}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Karşılaştır
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage; 