import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-500 font-mono">
        <p>Terminal log based on "ETA (English Edition)" by Bunny Kodaganti.</p>
        <p className="mt-2 text-xs opacity-70">&copy; 2024 // End of Transmission</p>
      </div>
    </footer>
  );
};

export default Footer;
