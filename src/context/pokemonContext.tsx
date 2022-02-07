import { getPokemonById } from 'app/api';
import { createContext, ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { generatePokemonId } from 'utils/generateRandomPokemonID';

interface PokemonContextData {
   isLoading: boolean;
   randomPokemonData: any;
   handleGetRandomPokemon: Function;
}

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonContext = createContext({} as PokemonContextData);

PokemonContext.displayName = 'PokemonContext';

export function PokemonProvider({ children }: PokemonProviderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [randomPokemonData, setRandomPokemonData] = useState(
      {} 
    );

    async function handleGetRandomPokemon() {
      try {
        setRandomPokemonData([])
        setIsLoading(true);
        const pokemonId = generatePokemonId();
        const pokemonData = await getPokemonById(pokemonId);
        setTimeout(() =>{
          setRandomPokemonData(pokemonData); 
          setIsLoading(false);
        }, 300);
      } catch (e: any ) {
        toast.error('Não foi possível gerar o pokemon neste momento. tente novamente mais tarde!')
      } 
    }

  return (
    <PokemonContext.Provider
      value={{
        isLoading,
        randomPokemonData,
        handleGetRandomPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

