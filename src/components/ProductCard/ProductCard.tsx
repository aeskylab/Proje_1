'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '../../services/productService';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  brand?: string; // Ürün verisinde brand yoktu, opsiyonel ekledim
}

const ProductCard = ({ product, brand }: ProductCardProps) => {
  // Görüntü URL'sinin güvenli olup olmadığını kontrol et
  const isExternalImage = product.image_url?.startsWith('http');
  
  // Placeholder görüntü, gerçek görüntü yoksa
  const placeholderImage = `https://placehold.co/300x400/png?text=${encodeURIComponent(product.name)}`;
  
  // Kullanılacak görüntü URL'si
  const imageUrl = product.image_url || placeholderImage;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      <div className="p-4">
        {/* Ürün görüntüsü */}
        <div className="mb-4 flex justify-center">
          {isExternalImage && imageUrl.includes('placehold.co') ? (
            <div className="relative w-full h-48">
              <Image 
                src={imageUrl}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <img 
              src={imageUrl} 
              alt={product.name} 
              className="h-48 w-auto object-contain"
            />
          )}
        </div>
        
        {/* Ürün bilgileri */}
        <h3 className="font-bold text-lg mb-1 truncate">{product.name}</h3>
        
        {brand && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{brand}</p>
        )}
        
        <p className="text-blue-600 dark:text-blue-400 font-medium text-lg mb-4">
          {product.price.toLocaleString('tr-TR')} ₺
        </p>
        
        {product.description && (
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {/* Görüntüle butonu */}
        <Link href={`/products/${product.id}`}>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
            Görüntüle
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard; 