import React from 'react';
import { QUESTS } from '../constants';
import type { Quest } from '../types';
import { MapIcon } from './Icons';

export const SerpentSlayerAnimation: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <svg viewBox="0 0 200 200" className="w-64 h-64">
      <path
        d="M 50 150 C 70 130, 90 130, 110 150 S 150 170, 170 150"
        stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none"
        style={{ animation: `serpent-recoil 2.5s ease-in-out infinite` }}
      />
      <g style={{ animation: 'hammer-strike 2.5s ease-in-out infinite' }}>
        <rect x="100" y="30" width="15" height="50" fill="#94A3B8" />
        <rect x="85" y="15" width="45" height="25" fill="#64748B" />
      </g>
    </svg>
  </div>
);

export const CannibalMountainAnimation: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <svg viewBox="0 0 100 80" className="w-80 h-auto" style={{ animation: `mountain-glow 3s ease-in-out infinite` }}>
      <path d="M0 80 L20 40 L40 60 L60 20 L80 70 L100 80 Z" fill="#166534" />
      <path d="M10 80 L30 50 L50 70 L70 30 L90 75 L100 80 Z" fill="#052e16" />
    </svg>
  </div>
);

export const FieryLionAnimation: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none">
    <svg viewBox="0 0 200 200" className="w-80 h-80">
      <defs>
        <filter id="fire-effect-quest">
          <feTurbulence baseFrequency="0.02 0.05" numOctaves="2" type="fractalNoise" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" />
          <feGaussianBlur stdDeviation="3.5" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" />
        </filter>
      </defs>
      <g filter="url(#fire-effect-quest)">
        <path d="M125.3,72.1 C125.3,72.1 110,51 100,51 C90,51 74.7,72.1 74.7,72.1 C74.7,72.1 60,81 60,96 C60,111 75,141 100,141 C125,141 140,111 140,96 C140,81 125.3,72.1 125.3,72.1 Z" fill="#f59e0b" />
      </g>
    </svg>
  </div>
);

export const SacrificialTribeAnimation: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <g style={{ animation: 'tribal-pulse 2s ease-in-out infinite' }}>
      <svg viewBox="0 0 100 100" className="w-64 h-64">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M50 10 L55 20 L45 20 Z" fill="currentColor" />
        <path d="M50 90 L55 80 L45 80 Z" fill="currentColor" />
        <path d="M10 50 L20 55 L20 45 Z" fill="currentColor" />
        <path d="M90 50 L80 55 L80 45 Z" fill="currentColor" />
      </svg>
    </g>
  </div>
);

const QuestCard: React.FC<{ quest: Quest; hoverAnimationClass: string }> = ({ quest, hoverAnimationClass }) => {
    const colorVariants = {
        slate: { text: 'text-slate-300', border: 'border-slate-700', shadow: 'shadow-[var(--glow-slate)]' },
        amber: { text: 'text-amber-300', border: 'border-amber-700', shadow: 'shadow-[var(--glow-amber)]' },
        red: { text: 'text-red-300', border: 'border-red-700', shadow: 'shadow-[var(--glow-red)]' },
        emerald: { text: 'text-emerald-300', border: 'border-emerald-700', shadow: 'shadow-[var(--glow-emerald)]' },
    };
    const { text, border, shadow } = colorVariants[quest.color as keyof typeof colorVariants];

    const renderQuestAnimation = () => {
        switch (quest.characterName) {
            case 'HERO': return <SerpentSlayerAnimation />;
            case 'FRAN': return <CannibalMountainAnimation />;
            case 'SAMRAT': return <FieryLionAnimation />;
            case 'MANTRA': return <SacrificialTribeAnimation />;
            default: return null;
        }
    };
    
    return (
        <div className={`
            group relative rounded-lg p-8 overflow-hidden transition-all duration-300
            bg-slate-900/70 border ${border} ${shadow} backdrop-blur-sm flex flex-col justify-end
        `}>
            <div className={`absolute inset-0 opacity-15 ${text}`}>
                {renderQuestAnimation()}
            </div>
            <div className="relative z-10">
                <quest.Icon className={`w-10 h-10 mb-4 ${text}`} />
                <h3 className={`text-2xl font-bold mb-2 uppercase ${text}`}>{quest.obstacle} <span className={`inline-block ${hoverAnimationClass}`}>{quest.emoji}</span></h3>
                <p className="text-sm text-slate-400 font-mono mb-4">MAP SOURCE: {quest.mapAnimal}</p>
                <p className="text-slate-300 leading-relaxed">{quest.description}</p>
            </div>
        </div>
    );
};

const QuestsSection: React.FC = () => {
  const animationClasses = [
    'animate-bob-on-hover', 
    'animate-bob-on-hover-slow', 
    'animate-bob-on-hover-fast', 
    'animate-bob-on-hover-veryslow'
  ];

  return (
    <section className="py-20 lg:py-24 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <div className="flex justify-center mb-6">
              <MapIcon />
           </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wider">The Four Perilous Paths</h2>
          <p className="mt-4 text-lg text-slate-400 font-mono">Each hero followed a map, leading them to a unique and deadly trial.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {QUESTS.map((quest, index) => (
            <QuestCard 
              key={quest.obstacle} 
              quest={quest} 
              hoverAnimationClass={animationClasses[index % animationClasses.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuestsSection;