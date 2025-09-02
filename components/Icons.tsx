import React from 'react';

export const PrologueIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 text-teal-400 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

export const CharacterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 text-slate-300 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);


export const MapIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 text-slate-300 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503-10.498l4.277-2.138a.75.75 0 011.002.864l-4.5 12.001a.75.75 0 01-1.415-.532l-.571-3.427a.75.75 0 00-.532-1.415h-3.427l-.532-1.415a.75.75 0 01.864-1.002l12.001-4.5z" />
 </svg>
);

export const CurseIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
 </svg>
);

export const IntertwinedPathsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 text-slate-300 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 4.5C15 4.5 9 19.5 3.75 19.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5c5.25 0 11.25 15 16.5 15" />
  </svg>
);


export const SwordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m-4.5-4.5h9" />
  </svg>
);
export const WhipIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75c0 3.393-2.757 6.15-6.15 6.15S4.95 10.143 4.95 6.75m12.3 0c0-1.24-.343-2.382-.93-3.348M4.95 6.75c0-1.24.343-2.382.93-3.348m0 0A5.992 5.992 0 0111.1 3c.966 0 1.87.214 2.67.599m-8.4 0V21" />
  </svg>
);
export const FireIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" />
  </svg>
);
export const StaffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V6m0-3a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
);
export const SnakeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a3 3 0 002.25-1.03l-1.5-1.875a.375.375 0 01.188-.518l2.67-1.043a.75.75 0 00.28-.962l-1.38-2.415a.375.375 0 01.1-.532l1.65-1.238a.75.75 0 00-.02-1.228l-2.074-1.482a.375.375 0 01-.3-.492l.534-1.942a.375.375 0 00-.65-.313l-1.637 1.232a.75.75 0 00-.26.98l.68 1.905a.375.375 0 01-.58.337l-1.88-1.024a.75.75 0 00-.86.275l-1.036 1.554a.375.375 0 01-.55.086L4.25 8.514a.75.75 0 00-1.06.04L2.01 9.754a.375.375 0 01-.51.085l-1.2-1.028a.75.75 0 00-1.03.313l-.71 1.295a.375.375 0 01.14.542l1.23 1.639a.75.75 0 001.07.039l1.49-1.232a.375.375 0 01.52.07L8.25 15a3 3 0 003.75.75z" />
  </svg>
);
export const MountainIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);
export const LionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v.01M12 6c-2.485 0-4.5 2.015-4.5 4.5S9.515 15 12 15s4.5-2.015 4.5-4.5S14.485 6 12 6z" />
  </svg>
);
export const TribeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h13.5m-13.5 7.5h13.5m-1.5-15l-1.5 4.5m-1.5-4.5l-1.5 4.5m4.5-4.5l-1.5 4.5M12 3.75l-1.5 4.5m1.5-4.5l1.5 4.5M12 19.5l-1.5-4.5m1.5 4.5l1.5-4.5m-4.5 4.5l1.5-4.5m-1.5 4.5l1.5-4.5" />
  </svg>
);

export const CrownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l5-4 4 4 4-4 5 4v10H3V7z" />
  </svg>
);