
import type { Character, Quest } from './types';
import { HeroIcon, FranIcon, SamratIcon, MantraIcon, SnakeIcon, MountainIcon, LionIcon, TribeIcon } from './components/Icons';

export const CHARACTERS: Character[] = [
  {
    name: 'HERO',
    title: 'The Driver with a Cause',
    description: "A skilled taxi driver from Hyderabad, haunted by personal loss. He's pragmatic and strong-willed, hired for a treasure-hunting expedition, unaware that his destiny is tied to the cursed treasure. His final incarnation is as Hiran Kumar.",
    icon: HeroIcon,
    color: 'cyan',
    image: 'https://picsum.photos/seed/herodriver/800/600',
  },
  {
    name: 'FRANSIS R Jr',
    title: 'The Adventurous Archaeologist',
    description: "An English archaeologist from a wealthy family, driven by a passion for history. He joins an expedition to a mysterious forest in India, viewing it as the ultimate research opportunity, blind to the ancient curse he's walking into.",
    icon: FranIcon,
    color: 'amber',
    image: 'https://picsum.photos/seed/archaeologist/800/600',
  },
  {
    name: 'SAMRAT',
    title: 'The Arrogant Tribal King',
    description: "An aggressive, impulsive, and powerful tribal king from the forests of Africa. He moonlights as a notorious smuggler. His lust for a greater challenge leads him to join a treasure hunt, seeking glory and adrenaline.",
    icon: SamratIcon,
    color: 'rose',
    image: 'https://picsum.photos/seed/tribalking/800/600',
  },
  {
    name: 'MANTRA',
    title: 'The Cursed Magician',
    description: "A powerful magician born with a strange curse: female by day, male by night. Seeking a cure for his condition, he believes the legendary treasure holds the key to breaking his curse, embarking on a quest with his sister Maya.",
    icon: MantraIcon,
    color: 'lime',
    image: 'https://picsum.photos/seed/magician/800/600',
  },
];

export const QUESTS: Quest[] = [
  {
    characterName: 'HERO',
    mapAnimal: 'Eagle',
    obstacle: 'The Giant Serpent',
    description: "Guided by a map carried by an Eagle, Hero's corporate expedition is ambushed by a colossal, ancient serpent guarding the path. This trial tests his courage and forces him to confront the 'cancer' of his past, destroying the beast in a fit of rage and sorrow.",
    Icon: SnakeIcon,
    color: 'cyan',
  },
  {
    characterName: 'FRANSIS',
    mapAnimal: 'Owl',
    obstacle: 'The Cannibal Mountains',
    description: "Fran's team follows a map found on an Owl, leading them to a chain of three mountains. The mountains are cursed; their strange plants and heated air transform trespassers into flesh-eating cannibals. Fran must survive the horrifying transformation of his colleagues.",
    Icon: MountainIcon,
    color: 'amber',
  },
  {
    characterName: 'SAMRAT',
    mapAnimal: 'Peacock',
    obstacle: 'The Magical Lion',
    description: "The Peacock's map leads Samrat into a dark part of the forest where a mythical, fiery lion hunts at night. The beast is a creature of pure heat and rage. Samrat, seeking the ultimate hunt, faces this formidable foe in a battle of raw power.",
    Icon: LionIcon,
    color: 'rose',
  },
  {
    characterName: 'MANTRA',
    mapAnimal: 'Dove',
    obstacle: 'The Sacrificial Tribes',
    description: "Following the Dove's map, Mantra and his companions are captured by a cannibalistic tribe. These tribesmen are guardians of the treasure, created by the King's magic. To save his sister, Mantra must confront them and inadvertently become their living deity.",
    Icon: TribeIcon,
    color: 'lime',
  },
];
