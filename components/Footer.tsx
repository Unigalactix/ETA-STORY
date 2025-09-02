import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-500 font-mono">
        <p>Terminal log based on "ETA (English Edition)" by Bunny Kodaganti.</p>
        <p className="mt-2 text-xs opacity-70">&copy; 2024 // End of Transmission</p>
        <p className="mt-3 text-sm">
          <a
            href="https://notebooklm.google.com/notebook/5c4defd1-f8d7-42db-ae42-e82aa9a9689d"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:underline"
            aria-label="Open related notebook in a new tab (external)"
          >
            View related Notebook 77
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
