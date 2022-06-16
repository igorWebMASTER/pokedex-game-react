import { PokemonProps } from 'dtos/pokemon';
import { createContext, ReactNode, useState, useCallback, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

interface PokedexContextData {
  handleAddPokemonToPokedex: Function;
  setPokedex: Function;
  handleEditNamePokemon: Function;
  handleReleasePokemon: Function;
  handleEditCustomPokemon: Function;
  handleAddCustomPokemon: Function;
  pokedex: PokemonProps[];
}


interface PokedexProviderProps {
  children: ReactNode;
}

export const PokedexContext = createContext({} as PokedexContextData);

PokedexContext.displayName = 'PokedexContext';

export function PokedexProvider({ children }: PokedexProviderProps) {
  const getInitialPokedexState = () => {
    const data = JSON.parse(localStorage.getItem('@pokedex-game') as any) || Array(6).fill([]);
    return data;
  };

  const [pokedex, setPokedex] = useState(getInitialPokedexState);

  useEffect(() => {
    if (pokedex) {
      localStorage.setItem('@pokedex-game', JSON.stringify(pokedex))
    }
  }, [pokedex])

  function handleAddPokemonToPokedex(pokemon: PokemonProps) {
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

  function handleEditNamePokemon(pokemonId: string, name: string) {
    if (!pokedex.find((slot: { id: string; }) => slot.id === pokemonId)) return;
    if (!pokemonId) return;

    pokedex.forEach((pokemon: any, index: number) => {
      if (pokemon.id === pokemonId) {
        setPokedex([
          ...pokedex.slice(0, index),
          {
            ...pokedex[index],
            name,
          },
          ...pokedex.slice(index + 1),
        ]);
      }

      return pokedex;
    });

  }

  function handleReleasePokemon(pokemonId: string) {
    if (!pokemonId) return;
    if (!pokedex.find((slot: { id: string; }) => slot.id === pokemonId)) return;
    const newSlots = pokedex.map((pokemon: { id: string; }, index: number) => {
      if (pokemon.id === pokemonId) return [];
      return pokemon;
    });

    setPokedex(newSlots);
  }

  function handleAddCustomPokemon(data: PokemonProps) {
    const id = crypto
    const newPokemonData = {
      ...data,
      id: id,
    };
    if (pokedex.find((slot: { name: string; }) => slot.name === data.name)) {
      return toast.error('Esse nome já está sendo usado');
    }
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


  const values = useMemo(
    () => ({
      pokedex,
      setPokedex,
      handleAddPokemonToPokedex,
      handleReleasePokemon,
      handleEditNamePokemon,
      handleAddCustomPokemon,
      handleEditCustomPokemon
    }), [pokedex, setPokedex, handleAddPokemonToPokedex, handleReleasePokemon, handleEditNamePokemon, handleAddCustomPokemon, handleEditCustomPokemon]);

  return (
    <PokedexContext.Provider
      value={values}
    >
      {children}
    </PokedexContext.Provider>
  );
}
