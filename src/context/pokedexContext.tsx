import { PokemonProps } from 'components/ModalPokemonInfo';
import { ModalGeneral } from 'components/Modal';
import { createContext, ReactNode, useState, useCallback } from 'react';

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
  const [slots, setSlots] = useState(Array(6).fill([]));

  const addPokemonToSlots = (pokemon: any) => {
    if (slots.find((slot) => slot.id === pokemon.id)) return;
    slots.map((slot, index) => {
      if (!slot.id) {
        setSlots([
          ...slots.slice(0, index),
          pokemon,
          ...slots.slice(index + 1),
        ]);
      }
      return slots;
    });
  };

  const handleEditNamePokemon = (pokemonId: string, name: string) => {
    if (!slots.find((slot) => slot.id === pokemonId)) return;
    slots.map((slot, index) => {
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
    if (slots.find((slot) => slot.id === pokemonId)) {
      const newSlots = slots.map((pokemon) => {
        if (pokemon.id === pokemonId) return [];
        return pokemon;
      });

      setSlots(newSlots);
    }
  }

  function handleAddCustomPokemon(data: any) {
    const id = Math.floor(Math.random() * 1000000);
    const newPokemonData = {
      ...data,
      id: id,
    };
    if (slots.find((slot) => slot.name === data.name)) return;
    slots.map((slot, index) => {
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
