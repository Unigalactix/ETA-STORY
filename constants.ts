import type { Character, Quest, MapPath } from './types';
import { SwordIcon, WhipIcon, FireIcon, StaffIcon, SnakeIcon, MountainIcon, LionIcon, TribeIcon, CrownIcon } from './components/Icons';

export const CHARACTERS: Character[] = [
  {
    name: 'THE KING',
    title: 'The First Seeker',
    description: "The original seeker of the treasure. Arrogant and powerful, he sought eternal glory but was ensnared by his own creation—a curse that doomed him to an endless cycle of reincarnation. He was the first to fall, his soul fracturing and beginning the chain of fated lives.",
    icon: CrownIcon,
    color: 'yellow',
    image: 'https://images.unsplash.com/photo-1575995059032-15f335343464?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    emoji: '👑',
    stats: {
      courage: 95,
      intellect: 50,
      agility: 50,
    },
  },
  {
    name: 'SAMRAT',
    title: 'The Arrogant Tribal King',
    description: "An aggressive, impulsive, and powerful tribal king from the forests of Africa. He moonlights as a notorious smuggler. His lust for a greater challenge leads him to join a treasure hunt, seeking glory and adrenaline.",
    icon: FireIcon,
    color: 'red',
    image: 'https://images.unsplash.com/photo-1617196231362-f67a2d88b449?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    emoji: '🔥',
    stats: {
      courage: 85,
      intellect: 30,
      agility: 90,
    },
  },
  {
    name: 'MANTRA',
    title: 'The Cursed Magician',
    description: "A unique magician born with a curse that changes his gender from a girl (6 am-6 pm) to a boy (6 pm-6 am). Initially seeking the treasure to break his own curse, his journey becomes a selfless quest to find it for his beloved sister, Maya.",
    icon: StaffIcon,
    color: 'emerald',
    image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    emoji: '✨',
    stats: {
      courage: 70,
      intellect: 85,
      agility: 40,
    },
  },
    {
    name: 'FRANSIS R Jr',
    title: 'The Adventurous Archaeologist',
    description: "An English archaeologist from a wealthy family, driven by a passion for history. He joins an expedition to a mysterious forest in India, viewing it as the ultimate research opportunity, blind to the ancient curse he's walking into.",
    icon: WhipIcon,
    color: 'amber',
    image: 'https://images.unsplash.com/photo-1603612769065-1d483457c143?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    emoji: '🧭',
    stats: {
      courage: 40,
      intellect: 95,
      agility: 60,
    },
  },
  {
    name: 'HERO',
    title: 'The Driver with a Cause',
    description: "A taxi driver in Hyderabad, saving money for his sister's cancer treatment. After she tragically passes away, he finds a new purpose in helping others. His life takes an adventurous turn when a company hires him for a treasure hunt, leading him toward his forgotten destiny. His final incarnation is Hiran Kumar.",
    icon: SwordIcon,
    color: 'slate',
    image: 'https://images.unsplash.com/photo-1551062382-2435b67812b1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    emoji: '🚕',
    stats: {
      courage: 90,
      intellect: 60,
      agility: 70,
    },
  },
];

export const QUESTS: Quest[] = [
  {
    characterName: 'HERO',
    mapAnimal: 'Eagle',
    obstacle: 'The Giant Serpent',
    description: "Guided by a map carried by an Eagle, Hero's corporate expedition is ambushed by a colossal, ancient serpent guarding the path. This trial tests his courage and forces him to confront the 'cancer' of his past, destroying the beast in a fit of rage and sorrow.",
    Icon: SnakeIcon,
    color: 'slate',
    image: 'https://images.unsplash.com/photo-1622329923235-ccb62386347f?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    emoji: '🐍',
  },
  {
    characterName: 'FRAN',
    mapAnimal: 'Owl',
    obstacle: 'The Cannibal Mountains',
    description: "Fran's team follows a map found on an Owl, leading them to a chain of three mountains. The mountains are cursed; their strange plants and heated air transform trespassers into flesh-eating cannibals. Fran must survive the horrifying transformation of his colleagues.",
    Icon: MountainIcon,
    color: 'amber',
    image: 'https://images.unsplash.com/photo-1542224562-e2a2296d4d13?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    emoji: '⛰️',
  },
  {
    characterName: 'SAMRAT',
    mapAnimal: 'Peacock',
    obstacle: 'The Magical Lion',
    description: "The Peacock's map leads Samrat into a dark part of the forest where a mythical, fiery lion hunts at night. The beast is a creature of pure heat and rage. Samrat, seeking the ultimate hunt, faces this formidable foe in a battle of raw power.",
    Icon: LionIcon,
    color: 'red',
    image: 'https://images.unsplash.com/photo-1629733477121-7443174a7431?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    emoji: '🦁',
  },
  {
    characterName: 'MANTRA',
    mapAnimal: 'Dove',
    obstacle: 'The Sacrificial Tribes',
    description: "Following the Dove's map, Mantra and his companions are captured by a cannibalistic tribe. These tribesmen are guardians of the treasure, created by the King's magic. To save his sister, Mantra must inadvertently become their living deity.",
    Icon: TribeIcon,
    color: 'emerald',
    image: 'https://images.unsplash.com/photo-1588856143224-3e9994c69b9b?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    emoji: '🗿',
  },
];

export const MAP_PATHS: MapPath[] = [
  {
    characterName: 'HERO',
    color: 'slate',
    events: [
      { title: 'Entering the Forest', description: 'Hero begins his journey, hired for an expedition into a dense, uncharted forest, a world away from his life as a taxi driver.', position: { x: 20, y: 85 }, emoji: '🌲' },
      { title: 'The Serpent\'s Lair', description: 'The path is blocked by a colossal serpent. Hero confronts the beast, channeling his past grief and rage to overcome the monstrous obstacle.', position: { x: 45, y: 60 }, emoji: '🐍' },
    ],
  },
  {
    characterName: 'FRAN',
    color: 'amber',
    events: [
      { title: 'The Cursed Woods', description: 'Fransis and his team venture deep into the mysterious woods, following an ancient map, unaware of the curses that permeate the land.', position: { x: 25, y: 25 }, emoji: '🌳' },
      { title: 'The Cannibal Mountains', description: 'The expedition is horrified to discover the curse of the mountains, which transforms people into cannibals. Fran must fight for his survival and sanity.', position: { x: 50, y: 35 }, emoji: '💀' },
    ],
  },
  {
    characterName: 'SAMRAT',
    color: 'red',
    events: [
      { title: 'The Hunt Begins', description: 'Lured by the promise of the ultimate hunt, the arrogant tribal king Samrat enters the forest, seeking glory and a worthy adversary.', position: { x: 80, y: 90 }, emoji: '🏹' },
      { title: 'The Magical Lion\'s Den', description: 'Samrat tracks a mythical, fiery lion. The ensuing battle is a clash of raw, primal power between two apex predators.', position: { x: 70, y: 70 }, emoji: '🦁' },
    ],
  },
  {
    characterName: 'MANTRA',
    color: 'emerald',
    events: [
      { title: 'A Selfless Quest', description: 'Mantra\'s search for a cure for their own curse transforms into a selfless quest to find the treasure for their beloved sister, Maya.', position: { x: 85, y: 20 }, emoji: '🙏' },
      { title: 'Deity of the Sacrificial Tribe', description: 'Captured by a cannibalistic tribe guarding the treasure, Mantra is unexpectedly hailed as their living deity, a twist of fate that tests their resolve.', position: { x: 75, y: 45 }, emoji: '🛖' },
    ],
  },
  {
    characterName: 'FINALE',
    color: 'yellow',
    events: [
      { title: 'The Convergence', description: 'The four paths and lifetimes converge at the location of the cursed treasure. As Hero, the final incarnation, he stands before it as a total lunar eclipse begins.', position: { x: 62, y: 52 }, emoji: '💥' },
    ],
  },
];