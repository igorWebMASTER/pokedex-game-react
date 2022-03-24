export interface PokemonProps {
  [x: string]: any;
  lenght: number;
  name: string;
  id?: string | undefined;
  weight: number;
  base_experience: number;
  hp: number;
  attack?: string;
  isSelected?: boolean;
  specialAttack?: string;
  specialDefense?: string;
  defense?: string;
  height: number;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: string[];
  abilities?: string[];
  ability1?: string;
  ability2?: string;
  ability3?: string;
  ability4?: string;
  pokemon: boolean;
}
