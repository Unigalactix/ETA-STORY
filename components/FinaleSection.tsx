import React from 'react';
import { CurseIcon } from './Icons';
import { RocketLaunchGame } from './MiniGames';

const FinaleSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-8 text-red-500">
          <CurseIcon className="animate-pulse-red" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left md:text-right md:border-r border-red-500/30 md:pr-12">
            <h2 className="text-2xl sm:text-3xl font-black text-red-400 mb-4 uppercase tracking-wider">The King's Mistake <span aria-hidden="true">👑💀</span></h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              The treasure was cursed: touching it at any time but a total lunar eclipse doomed the seeker to be reborn, memories erased, fated to repeat the quest. The King was the first victim, triggering a cycle of reincarnation that became Samrat, Mantra, Fran, and finally, Hero.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="text-2xl sm:text-3xl font-black text-teal-300 mb-4 uppercase tracking-wider">The Cycle Broken <span aria-hidden="true">⛓️✨</span></h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              Before the treasure, as the Moon turned red, Hero's memories returned. Rejecting a prize that caused so much pain, he shattered it, breaking the cycle. He left the forest, found peace, and eventually, as the successful Hiran Kumar, funded the very mission that would rescue Chandu.
            </p>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-teal-500/20">
            <h3 className="text-2xl sm:text-3xl font-black text-teal-300 mb-4 uppercase tracking-wider">Rescue Mission: Chandrayaan 32</h3>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed font-mono mb-8">
              With the curse broken and his destiny fulfilled, Hiran Kumar's first act of peace was to ensure no one else was left behind. It's time to bring our narrator home.
            </p>
            <RocketLaunchGame />
        </div>
      </div>
    </section>
  );
};

export default FinaleSection;