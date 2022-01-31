export interface PokemonProps {
  lenght: number;
  name: string;
  id: string;
  weight: number;
  base_experience: number;
  hp: number;
  attack?: string;
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
}
