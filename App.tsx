
import React from 'react';
import HeroSection from './components/HeroSection';
import CharactersSection from './components/CharactersSection';
import QuestsSection from './components/QuestsSection';
import FinaleSection from './components/FinaleSection';
import Footer from './components/Footer';
import { PrologueIcon } from './components/Icons';

const PrologueSection: React.FC = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gray-900/50 backdrop-blur-sm">
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center mb-6">
        <PrologueIcon />
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold text-cyan-300 mb-4">A Tale Begins on the Moon...</h2>
      <p className="text-lg text-gray-300 leading-relaxed">
        On June 2nd, 2053, astronaut Chandu of the Chandrayan 32 mission finds himself stranded and alone in a lunar cave. His communication is down. As despair sets in, an unexpected voice emerges - the Moon itself. To pass the time and share a timeless story, the Moon begins to narrate an epic tale of a cursed treasure, a foolish king, and the four souls bound to repeat a tragic quest through reincarnation.
      </p>
    </div>
  </section>
);


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <main>
        <HeroSection />
        <PrologueSection />
        <CharactersSection />
        <QuestsSection />
        <FinaleSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
