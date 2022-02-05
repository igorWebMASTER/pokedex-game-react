import React, {  useState } from 'react';

import Sidebar from 'components/Sidebar';

import { ModalCatchPokemon } from 'components/ModalCatchPokemon';
import * as S from './styled';
import { Ash } from 'components/Ash';
import { getPokemonById } from 'app/api';
import toast from 'react-hot-toast';


function MapPage() {
  // const [modalIsOpen, setIsOpen] = useState(false);
  function generatePokemonId() {
    const idPokemon = Math.floor(Math.random() * 897 + 1);
    return idPokemon;
  }

  const [isLoading, setIsLoading] = useState(false);

  const [randomPokemonData, setRandomPokemonData] = useState(
    {} as import('dtos/pokemon').PokemonProps
  );

  async function handleGetRandomPokemon() {
    try {
      setIsLoading(true);
      const pokemonId = generatePokemonId();
      const pokemonData = await getPokemonById(pokemonId)
      setTimeout(() => {
       setRandomPokemonData(pokemonData);
      //  openModal();

      }, 2000)
    } catch (e: any ) {
      toast.error('Não foi possível gerar o pokemon neste momento. tente novamente mais tarde!')
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <S.MapWrapper className="map">
        <Sidebar />
        <ModalCatchPokemon
          randomPokemonData={randomPokemonData}
        />
        <Ash
          onHandleGetRandomPokemon={handleGetRandomPokemon}
          isSearching={isLoading}
        />
      </S.MapWrapper>
    </>
  );
}

export default MapPage;
