import React, { useState } from 'react';
import type { Character } from '../types';
import { CHARACTERS } from '../constants';
import { CharacterIcon } from './Icons';
import { GameModal } from './MiniGames';

const StatsBar: React.FC<{ label: string; value: number; colorClass: string }> = ({ label, value, colorClass }) => (
    <div className="w-full text-xs font-mono">
        <div className="flex justify-between items-center mb-1">
            <span className="text-slate-400">{label}</span>
            <span className="text-slate-300">{value}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
            <div className={`${colorClass} h-full rounded-full`} style={{ width: `${value}%` }}></div>
        </div>
    </div>
);

const CharacterDossier: React.FC<{ character: Character; onPlayGame: (name: string) => void }> = ({ character, onPlayGame }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const colorVariants = {
    slate: { text: 'text-slate-400', border: 'border-slate-500', shadow: 'shadow-[var(--glow-slate)]', bg: 'bg-slate-400' },
    amber: { text: 'text-amber-400', border: 'border-amber-500', shadow: 'shadow-[var(--glow-amber)]', bg: 'bg-amber-400' },
    red: { text: 'text-red-400', border: 'border-red-500', shadow: 'shadow-[var(--glow-red)]', bg: 'bg-red-400' },
    emerald: { text: 'text-emerald-400', border: 'border-emerald-500', shadow: 'shadow-[var(--glow-emerald)]', bg: 'bg-emerald-400' },
    yellow: { text: 'text-yellow-400', border: 'border-yellow-500', shadow: 'shadow-[var(--glow-yellow)]', bg: 'bg-yellow-400' },
  };
  const { text, border, shadow, bg } = colorVariants[character.color as keyof typeof colorVariants];

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`
        relative w-80 rounded-lg p-6 overflow-hidden transition-all duration-500 ease-in-out
        bg-slate-900/70 border ${border} ${shadow} backdrop-blur-sm
        flex flex-col items-center text-center cursor-pointer
        ${isExpanded ? 'h-[38rem]' : 'h-80'}
      `}
    >
      <div className={`transition-all duration-500 ${isExpanded ? 'translate-y-0' : 'translate-y-24'}`}>
        <character.icon className={`w-10 h-10 mb-2 mx-auto ${text}`} />
        <h3 className={`text-2xl font-bold uppercase tracking-wider ${text}`}>
          {character.name} {character.emoji}
        </h3>
        <h4 className="text-sm font-semibold text-slate-300">{character.title}</h4>
      </div>
      
      <div className={`
        absolute w-full px-12 space-y-3 transition-all duration-500
        ${isExpanded ? 'top-40 opacity-100 translate-y-0 delay-200' : 'top-40 opacity-0 translate-y-16'}
      `}>
          <StatsBar label="Courage" value={character.stats.courage} colorClass={bg} />
          <StatsBar label="Intellect" value={character.stats.intellect} colorClass={bg} />
          <StatsBar label="Agility" value={character.stats.agility} colorClass={bg} />
      </div>

      <div className={`
          absolute top-72 w-full px-8 transition-[opacity,transform] duration-500 ease-in-out 
          ${isExpanded ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-4'}
      `}>
          <p className="text-slate-300 text-sm h-40 overflow-y-auto leading-relaxed text-left font-mono border-t border-slate-700/50 pt-4">
              {character.description}
          </p>
      </div>

      {isExpanded && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-8">
             <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onPlayGame(character.name);
                }}
                className={`w-full py-3 text-sm font-bold uppercase tracking-widest rounded ${bg} text-slate-900 transition-all duration-300 hover:shadow-lg ${shadow} hover:scale-105`}
             >
                Play Minigame
             </button>
        </div>
    )}
    </div>
  );
};


const CharactersSection: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <div className="flex justify-center mb-6">
             <CharacterIcon />
           </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wider">The Five Fated Souls</h2>
          <p className="mt-4 text-lg text-slate-400 font-mono">Five lives, one soul, one curse. All unknowingly reincarnated.</p>
        </div>
        
        <div className="flex flex-wrap gap-8 justify-center items-start py-4">
            {CHARACTERS.map(char => (
              <CharacterDossier 
                key={char.name}
                character={char}
                onPlayGame={setActiveGame}
              />
            ))}
        </div>
      </div>
      {activeGame && <GameModal gameName={activeGame} onClose={() => setActiveGame(null)} />}
    </section>
  );
};

export default CharactersSection;