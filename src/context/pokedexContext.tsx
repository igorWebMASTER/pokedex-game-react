import { PokemonProps } from 'dtos/pokemon';
import { createContext, ReactNode, useState, useCallback, useEffect } from 'react';

interface PokedexContextData {
  handleAddPokemonToPokedex: Function;
  setPokedex: Function;
  handleEditNamePokemon:Function;
  handleReleasePokemon: Function;
  handleEditCustomPokemon: Function;
  handleAddCustomPokemon: Function;
  pokedex: PokemonProps[];
}


interface PokedexProviderProps {
  children: ReactNode;
}

export const PokedexContext = createContext({} as PokedexContextData);

export function PokedexProvider({ children }: PokedexProviderProps) {
  const getInitialPokedexState = () => {
    const data = JSON.parse(localStorage.getItem('@pokedex-game') as any) || Array(6).fill([]);
    return data;
  };

  const [pokedex, setPokedex] = useState(getInitialPokedexState) ;

  useEffect(() => {
    if(pokedex) {
      localStorage.setItem('@pokedex-game', JSON.stringify(pokedex))
    }
  }, [pokedex])

  function handleAddPokemonToPokedex  (pokemon: PokemonProps) {
    if (pokedex.find((slot: { id: string; }) => slot.id === pokemon.id)) return;
    
    pokedex.map((slot: { id: string; }, index: number) => {
      
      if (!slot.id) {
       
        setPokedex(([
            ...pokedex.slice(0, index),
            pokemon,
            ...pokedex.slice(index + 1),
        ]));
      }
      return pokedex;
    });
  };

  function handleEditNamePokemon  (pokemonId: string, name: string) {
    if (!pokedex.find((slot: { id: string; }) => slot.id === pokemonId)) return;
     pokedex.map((slot: { id: string; }, index: number) => {
      if (slot.id === pokemonId) {
        const newSlots = {
          ...pokedex[index],
          name,
        }

          setPokedex([
            ...pokedex.slice(0, index),
            newSlots,
            ...pokedex.slice(index + 1),
          ]);
        }

      return pokedex;
    });
  }
  
  function handleReleasePokemon(pokemonId: string) {
    if (!pokemonId) return;
    if (!pokedex.find((slot: { id: string; }) => slot.id === pokemonId)) return;
    const newSlots = pokedex.map((pokemon: { id: string; }) => {
      if (pokemon.id === pokemonId) return [];
      return pokemon;
    });

    setPokedex(newSlots);
  }

  function handleAddCustomPokemon(data: PokemonProps) {
    const id = Math.floor(Math.random() * 1000000);
    const newPokemonData = {
      ...data,
      id: id,
    };
    if (pokedex.find((slot: { name: string; }) => slot.name === data.name)) return;
    pokedex.map((slot: { id: string; }, index: number) => {
      if (!slot.id) {
        setPokedex([
          ...pokedex.slice(0, index),
          newPokemonData,
          ...pokedex.slice(index + 1),
        ]);
      }
      return pokedex;
    });
  }

  const handleEditCustomPokemon = (pokemon: any) => {
    const newSlots = pokedex.map((slot: { id: string; }) => {
        if (slot.id === pokemon.id) {
          return pokemon
        }
        return slot;
     }
    );
    setPokedex(newSlots);
  }
  

  return (
    <PokedexContext.Provider
      value={{
        pokedex,
        setPokedex,
        handleAddPokemonToPokedex,
        handleReleasePokemon,
        handleEditNamePokemon,
        handleAddCustomPokemon,
        handleEditCustomPokemon
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
}
