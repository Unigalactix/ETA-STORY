
import React, { useState } from 'react';
import type { Character } from '../types';
import { CHARACTERS } from '../constants';
import { CharacterIcon } from './Icons';

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onSelect: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isSelected, onSelect }) => {
  const colorVariants = {
    cyan: 'border-cyan-400 text-cyan-300 group-hover:bg-cyan-900/50',
    amber: 'border-amber-400 text-amber-300 group-hover:bg-amber-900/50',
    rose: 'border-rose-400 text-rose-300 group-hover:bg-rose-900/50',
    lime: 'border-lime-400 text-lime-300 group-hover:bg-lime-900/50',
  };
  
  const selectedColorVariants = {
    cyan: 'bg-cyan-900/50 border-cyan-300',
    amber: 'bg-amber-900/50 border-amber-300',
    rose: 'bg-rose-900/50 border-rose-300',
    lime: 'bg-lime-900/50 border-lime-300',
  };

  const Icon = character.icon;

  return (
    <div
      onClick={onSelect}
      className={`group cursor-pointer p-4 border-2 rounded-lg transition-all duration-300 ${isSelected ? selectedColorVariants[character.color as keyof typeof selectedColorVariants] : `${colorVariants[character.color as keyof typeof colorVariants]} border-transparent`}`}
    >
      <div className="flex items-center space-x-4">
        <Icon className={`w-10 h-10`} />
        <div>
          <h3 className="text-xl font-bold">{character.name}</h3>
          <p className="text-sm opacity-80">{character.title}</p>
        </div>
      </div>
    </div>
  );
};


const CharactersSection: React.FC = () => {
  const [selected, setSelected] = useState<Character>(CHARACTERS[0]);

  return (
    <section className="py-20 bg-gray-800/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <div className="flex justify-center mb-6">
             <CharacterIcon />
           </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">The Four Fated Souls</h2>
          <p className="mt-4 text-lg text-gray-400">Four heroes, four lives, one curse. All are unknowingly the same soul, reincarnated.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-4">
            {CHARACTERS.map(char => (
              <CharacterCard 
                key={char.name}
                character={char}
                isSelected={selected.name === char.name}
                onSelect={() => setSelected(char)}
              />
            ))}
          </div>
          <div className="p-6 bg-gray-900 rounded-lg h-full relative overflow-hidden border border-gray-700">
             <div className={`absolute -top-20 -right-20 w-60 h-60 opacity-10 text-${selected.color}-400`}>
                <selected.icon className="w-full h-full"/>
             </div>
            <div className="relative z-10">
                <img src={selected.image} alt={selected.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className={`text-2xl font-bold text-${selected.color}-300`}>{selected.name}</h3>
                <h4 className="text-lg font-semibold text-gray-300 mb-3">{selected.title}</h4>
                <p className="text-gray-400 leading-relaxed">{selected.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharactersSection;
