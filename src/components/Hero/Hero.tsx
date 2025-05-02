import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400 text-white">
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-repeat"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/logo.png" 
              alt="KarşılaştırUrun Logo" 
              width={96} 
              height={96}
              className="rounded-full shadow-lg" 
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Seçtiğin ürünleri karşılaştır, en iyi kararı ver
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Saniyeler içinde karşılaştırma sonucuna ulaş.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg">
            Hemen Başla
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero; 