
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div 
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://picsum.photos/seed/spaceview/1920/1080')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 px-4">
        <h1 className="text-sm sm:text-base font-mono text-cyan-300 tracking-widest uppercase">A Bunn's Moon tale...</h1>
        <p className="mt-4 text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter" style={{ fontFamily: "'Times New Roman', serif" }}>
          ETO
        </p>
        <p className="mt-2 text-lg sm:text-xl font-mono text-gray-300 tracking-widest">
          ESTIMATED TIME OF ARRIVAL
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
