import React from 'react';

// Kategori verisi
const categories = [
  { id: 1, name: 'Telefonlar' },
  { id: 2, name: 'Laptoplar' },
  { id: 3, name: 'TV\'ler' },
  { id: 4, name: 'Kameralar' },
  { id: 5, name: 'Kulaklıklar' },
  { id: 6, name: 'Saatler' },
  { id: 7, name: 'Tabletler' },
  { id: 8, name: 'Aksesuarlar' },
  { id: 9, name: 'Bilgisayarlar' },
];

const CategoryBar = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 py-4 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex space-x-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className="whitespace-nowrap px-6 py-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;

// Tailwind scrollbar hide eklentisi için uyumlu CSS sınıfını ekleyeceğiz
// Bu yüzden globals.css'e aşağıdaki kodu da eklememiz gerekiyor:
/*
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
*/ 