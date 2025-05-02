import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ComparisonCardProps = {
  product1: {
    id: number;
    name: string;
    imageUrl: string;
  };
  product2: {
    id: number;
    name: string;
    imageUrl: string;
  };
};

const ComparisonCard = ({ product1, product2 }: ComparisonCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      <div className="p-4">
        {/* Ürün resimleri */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 flex justify-center">
            <div className="relative w-28 h-36">
              <Image
                src={product1.imageUrl}
                alt={product1.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            vs
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="relative w-28 h-36">
              <Image
                src={product2.imageUrl}
                alt={product2.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Ürün isimleri */}
        <div className="flex justify-between mb-4 text-center">
          <div className="flex-1 px-2">
            <p className="font-medium text-sm truncate">{product1.name}</p>
          </div>
          <div className="flex-1 px-2">
            <p className="font-medium text-sm truncate">{product2.name}</p>
          </div>
        </div>
        
        {/* Karşılaştırma butonu */}
        <Link href={`/compare?p1=${product1.id}&p2=${product2.id}`} className="block w-full">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
            Karşılaştır
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ComparisonCard; 