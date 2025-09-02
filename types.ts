
import React from 'react';

export interface Character {
  name: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  image: string;
  emoji: string;
  stats: {
    courage: number;
    intellect: number;
    agility: number;
  };
}

export interface Quest {
  characterName: string;
  mapAnimal: string;
  obstacle: string;
  description: string;
  Icon: React.ElementType;
  color: string;
  image: string;
  emoji: string;
}

export interface MapEvent {
  title: string;
  description: string;
  position: { x: number; y: number };
  emoji: string;
}

export interface MapPath {
  characterName: string;
  color: string;
  events: MapEvent[];
}