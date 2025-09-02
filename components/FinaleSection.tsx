
import React from 'react';
import { CurseIcon } from './Icons';

const FinaleSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-800/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6 text-rose-400">
          <CurseIcon />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-rose-300 mb-4">The King's Mistake & The Curse</h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          The treasure was cursed: touching it at the wrong time—any time but a total lunar eclipse—doomed the seeker to be reborn as an infant, their memories erased, destined to seek the treasure again. The King himself was the first victim, triggering a cycle of reincarnation. He was reborn as Samrat, then Mantra, then Fran, and finally, as Hero.
        </p>
        <div className="border-t border-gray-600 my-10"></div>
        <h3 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-4">The Cycle Broken</h3>
        <p className="text-lg text-gray-300 leading-relaxed">
          At the precipice of his final life, during a lunar eclipse, Hero remembers everything—all five lifetimes of suffering. Instead of claiming the treasure, he smashes it with a hammer, destroying the curse forever. He returns to the world, free. Back on the Moon, Chandu is rescued. He later meets the industrialist who funded his mission, Hiran Kumar, who whispers, "The Moon tells great stories, doesn't he?" revealing himself to be the freed soul of Hero.
        </p>
      </div>
    </section>
  );
};

export default FinaleSection;
