import { PokemonProps } from 'dtos/pokemon';
import { createContext, ReactNode, useState, useCallback, useEffect } from 'react';

interface PokedexContextData {
  addPokemonToSlots: Function;
  handleEditNamePokemon:Function;
  handleReleasePokemon: Function;
  handleAddCustomPokemon: Function;
  slots: PokemonProps[];
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

  const [slots, setSlots] = useState<any>(getInitialPokedexState) ;

  useEffect(() => {
    if(slots) {
      localStorage.setItem('@pokedex-game', JSON.stringify(slots))
    }
  }, [slots])

  const addPokemonToSlots = (pokemon: PokemonProps) => {
    if (slots.find((slot: { id: string; }) => slot.id === pokemon.id)) return;
    slots.map((slot: { id: string; }, index: number) => {
      if (!slot.id) {
        setSlots((state: PokemonProps[]) => ([
            ...slots.slice(0, index),
            pokemon,
            ...slots.slice(index + 1),
        ]));
      }
      return slots;
    });
  };

  const handleEditNamePokemon = (pokemonId: string, name: string) => {
    if (!slots.find((slot: { id: string; }) => slot.id === pokemonId)) return;
    slots.map((slot: { id: string; }, index: number) => {
      if (slot.id === pokemonId) {
        const newSlots = {
          ...slots[index],
          name,
        }

          setSlots([
            ...slots.slice(0, index),
            newSlots,
            ...slots.slice(index + 1),
          ]);
        }

      return slots;
    });
  }

  function handleReleasePokemon(pokemonId: string) {
    if (!pokemonId) return;
    if (slots.find((slot: { id: string; }) => slot.id === pokemonId)) {
      const newSlots = slots.map((pokemon: { id: string; }) => {
        if (pokemon.id === pokemonId) return [];
        return pokemon;
      });

      setSlots(newSlots);
    }
  }

  function handleAddCustomPokemon(data: PokemonProps) {
    const id = Math.floor(Math.random() * 1000000);
    const newPokemonData = {
      ...data,
      id: id,
    };
    if (slots.find((slot: { name: string; }) => slot.name === data.name)) return;
    slots.map((slot: { id: string; }, index: number) => {
      if (!slot.id) {
        setSlots([
          ...slots.slice(0, index),
          newPokemonData,
          ...slots.slice(index + 1),
        ]);
      }
      return slots;
    });
  }

  return (
    <PokedexContext.Provider
      value={{
        slots,
        addPokemonToSlots,
        handleReleasePokemon,
        handleEditNamePokemon,
        handleAddCustomPokemon,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
}
