import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getAllProducts, Product } from '../../services/productService';
import Link from 'next/link';

interface ProductsPageProps {
  searchParams: {
    category?: string;
  };
}

export const dynamic = 'force-dynamic'; // Her istekte sayfayı yeniden oluştur

async function ProductsPage({ searchParams }: ProductsPageProps) {
  // searchParams'dan kategoriyi al
  const { category } = searchParams;
  
  // Ürünleri getir (kategori varsa filtreleyerek)
  const products = await getAllProducts(category);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Başlık ve filtreleme özeti */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">
          {category 
            ? `${category} Kategorisindeki Ürünler` 
            : 'Tüm Ürünler'}
        </h1>
        
        {category && (
          <Link 
            href="/products" 
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            Filtreyi Temizle
          </Link>
        )}
      </div>
      
      {products.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-lg">Ürün bulunamadı.</p>
          {category && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Farklı bir kategori seçmeyi veya filtreyi temizlemeyi deneyin.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              brand={product.category}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage; 