import React, { useState } from 'react';
import { MAP_PATHS } from '../constants';
import type { MapEvent } from '../types';
import { IntertwinedPathsIcon } from './Icons';

const EventModal: React.FC<{ event: MapEvent; onClose: () => void; color: string }> = ({ event, onClose, color }) => {
  const colorVariants = {
    slate: 'border-slate-400 text-slate-300',
    amber: 'border-amber-400 text-amber-300',
    red: 'border-red-400 text-red-300',
    emerald: 'border-emerald-400 text-emerald-300',
    yellow: 'border-yellow-400 text-yellow-300',
  };
    
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      style={{ animation: 'flicker-in 0.3s ease-out forwards' }}
      onClick={onClose}
    >
      <div 
        className={`relative w-11/12 max-w-lg p-6 bg-slate-900/80 border-2 ${colorVariants[color as keyof typeof colorVariants]} rounded-lg shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-slate-400 hover:text-white text-3xl font-mono">&times;</button>
        <h3 className={`text-2xl font-bold mb-3 uppercase tracking-wider ${colorVariants[color as keyof typeof colorVariants].split(' ')[1]}`}>
          {event.title} <span className="ml-2" aria-hidden="true">{event.emoji}</span>
        </h3>
        <p className="text-slate-300 leading-relaxed font-mono">{event.description}</p>
      </div>
    </div>
  );
};

interface MapVisualizationProps {
    onEventClick: (event: MapEvent, color: string) => void;
}

const MapVisualization: React.FC<MapVisualizationProps> = ({ onEventClick }) => {
    const pathColors = {
        slate: 'var(--color-slate)',
        amber: 'var(--color-amber)',
        red: 'var(--color-red)',
        emerald: 'var(--color-emerald)',
        yellow: 'var(--color-yellow)',
    };

    return (
        <svg viewBox="-5 -5 110 110" className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="map-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100" height="100" fill="transparent" />

            {/* HUD and Grid */}
            <g opacity="0.5" filter="url(#map-glow)">
              <circle cx="50" cy="50" r="50" stroke="#0ea5e9" strokeWidth="0.25" fill="none" />
              <circle cx="50" cy="50" r="35" stroke="#0ea5e9" strokeWidth="0.1" fill="none" />
              <path d="M 50 0 V 100 M 0 50 H 100" stroke="#0ea5e9" strokeWidth="0.1" />
              <g stroke="#0ea5e9" strokeWidth="0.05">
                {Array.from({length: 9}).map((_, i) => (
                  <path key={i} d={`M ${10 + i*10} 0 V 100 M 0 ${10 + i*10} H 100`} />
                ))}
              </g>
            </g>

            {/* Paths */}
            <g strokeWidth="0.75" fill="none" strokeDasharray="2 2" style={{ animation: 'flicker-in 2s ease-out' }}>
                <path d="M 20 85 Q 30 70 45 60 T 62 52" stroke={pathColors.slate} />
                <path d="M 25 25 Q 40 30 50 35 T 62 52" stroke={pathColors.amber} />
                <path d="M 80 90 Q 75 80 70 70 T 62 52" stroke={pathColors.red} />
                <path d="M 85 20 Q 80 35 75 45 T 62 52" stroke={pathColors.emerald} />
            </g>

            {/* Event Markers */}
            {MAP_PATHS.flatMap(path =>
                path.events.map(event => (
                    <g
                        key={event.title}
                        transform={`translate(${event.position.x}, ${event.position.y})`}
                        onClick={() => onEventClick(event, path.color)}
                        className="cursor-pointer"
                        aria-label={`View details for ${event.title}`}
                    >
                        <title>{event.title}</title>
                        <circle r="1.5" fill={pathColors[path.color as keyof typeof pathColors]} filter="url(#map-glow)">
                            <animate attributeName="r" from="1.5" to="3" dur="1.5s" repeatCount="indefinite" begin={`${Math.random()}s`} />
                            <animate attributeName="opacity" from="1" to="0.5" dur="1.5s" repeatCount="indefinite" begin={`${Math.random()}s`} />
                        </circle>
                    </g>
                ))
            )}
        </svg>
    );
}

const InteractiveMapSection: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<MapEvent | null>(null);
  const [selectedEventColor, setSelectedEventColor] = useState<string>('slate');

  const handleEventClick = (event: MapEvent, color: string) => {
    setSelectedEvent(event);
    setSelectedEventColor(color);
  };

  return (
    <section className="py-20 lg:py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <IntertwinedPathsIcon />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wider">The Intertwined Journey</h2>
          <p className="mt-4 text-lg text-slate-400 font-mono">Trace the perilous paths that drew the heroes toward their shared destiny.</p>
        </div>

        <div className="relative border-2 border-slate-700/50 bg-slate-950 rounded-lg overflow-hidden aspect-square sm:aspect-video max-w-4xl mx-auto shadow-2xl">
          <MapVisualization onEventClick={handleEventClick} />
        </div>
      </div>
      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} color={selectedEventColor} />}
    </section>
  );
};

export default InteractiveMapSection;