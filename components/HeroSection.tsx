import React from 'react';

const StarrySkyAnimation: React.FC = () => {
  const stars = React.useMemo(() => Array.from({ length: 150 }).map(() => ({
    cx: Math.random() * 100,
    cy: Math.random() * 100,
    r: Math.random() * 0.15 + 0.05,
    duration: `${2 + Math.random() * 4}s`,
    delay: `${Math.random() * 5}s`,
  })), []);

  return (
    <div className="absolute inset-0 bg-slate-950" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        {stars.map((star, i) => (
          <circle
            key={i}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill="white"
            className="twinkle-star"
            style={{ 
                animationDuration: star.duration,
                animationDelay: star.delay 
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const MoonBackground: React.FC = () => (
    <div 
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
        style={{ perspective: '1000px' }}
        aria-hidden="true"
    >
        <div 
            className="absolute w-[150vmin] h-[150vmin] rounded-full bg-gradient-to-br from-gray-200 to-gray-500 opacity-20"
            style={{
                animation: 'slow-spin 240s linear infinite',
                transformStyle: 'preserve-3d',
                boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.05)'
            }}
        >
          {/* Craters */}
          <div className="absolute w-1/5 h-1/5 top-[20%] left-[25%] rounded-full bg-black/20" />
          <div className="absolute w-1/6 h-1/6 top-[50%] left-[60%] rounded-full bg-black/10" />
          <div className="absolute w-1/4 h-1/4 top-[65%] left-[15%] rounded-full bg-black/15" />
        </div>
    </div>
);


const HeroSection: React.FC = () => {
  return (
    <div 
      className="relative flex items-center justify-center text-center overflow-hidden min-h-screen"
    >
      <StarrySkyAnimation />
      <MoonBackground />

      {/* Scanline overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))',
          backgroundSize: '100% 4px, 6px 100%',
          animation: 'scanline 20s linear infinite'
        }} 
        aria-hidden="true"
      />
      
      <div className="relative z-10 px-4">
        <h1 className="text-base sm:text-lg font-mono text-teal-300 tracking-widest uppercase" style={{ animation: 'flicker-in 1.5s ease-out forwards' }}>
          A Bunn's Moon tale...
        </h1>
        <p className="mt-4 text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter" style={{ fontFamily: "'Exo 2', sans-serif", animation: 'text-glitch 1s linear infinite' }}>
          ETA
        </p>
        <p className="mt-2 text-lg sm:text-xl font-mono text-slate-300 tracking-widest" style={{ animation: 'flicker-in 1s 0.5s ease-out forwards', animationFillMode: 'both' }}>
          ESTIMATED TIME OF ARRIVAL
        </p>
      </div>
    </div>
  );
};

export default HeroSection;