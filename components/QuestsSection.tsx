
import React from 'react';
import { QUESTS } from '../constants';
import type { Quest } from '../types';
import { MapIcon } from './Icons';

const QuestCard: React.FC<{ quest: Quest }> = ({ quest }) => {
  const colorVariants = {
    cyan: 'from-cyan-500/10 to-gray-900 border-t-cyan-400',
    amber: 'from-amber-500/10 to-gray-900 border-t-amber-400',
    rose: 'from-rose-500/10 to-gray-900 border-t-rose-400',
    lime: 'from-lime-500/10 to-gray-900 border-t-lime-400',
  };
  
  const textColorVariants = {
    cyan: 'text-cyan-300',
    amber: 'text-amber-300',
    rose: 'text-rose-300',
    lime: 'text-lime-300',
  };

  return (
    <div className={`p-6 rounded-lg bg-gradient-to-b ${colorVariants[quest.color as keyof typeof colorVariants]} border-t-2 h-full flex flex-col`}>
      <div className="flex items-center mb-4">
        <quest.Icon className={`w-10 h-10 mr-4 ${textColorVariants[quest.color as keyof typeof textColorVariants]}`} />
        <div>
          <h3 className={`text-xl font-bold ${textColorVariants[quest.color as keyof typeof textColorVariants]}`}>{quest.obstacle}</h3>
          <p className="text-sm text-gray-400 font-mono">Map from: {quest.mapAnimal}</p>
        </div>
      </div>
      <p className="text-gray-400 leading-relaxed flex-grow">{quest.description}</p>
    </div>
  );
};


const QuestsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <div className="flex justify-center mb-6">
              <MapIcon />
           </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">The Four Perilous Paths</h2>
          <p className="mt-4 text-lg text-gray-400">Each hero followed a map delivered by a mystical creature, leading them to a unique and deadly trial.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {QUESTS.map(quest => (
            <QuestCard key={quest.obstacle} quest={quest} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuestsSection;
