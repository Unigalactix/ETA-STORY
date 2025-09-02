
export interface Character {
  name: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  image: string;
}

export interface Quest {
  characterName: string;
  mapAnimal: string;
  obstacle: string;
  description: string;
  Icon: React.ElementType;
  color: string;
}
