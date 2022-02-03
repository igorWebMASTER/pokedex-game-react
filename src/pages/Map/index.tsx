import React, { useState } from 'react';

import Sidebar from 'components/Sidebar';

import { ModalCatchPokemon } from 'components/ModalCatchPokemon';
import * as S from './styled';
import { Ash } from 'components/Ash';
import { getPokemonById } from 'app/api';

function MapPage() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function generatePokemonId() {
    const idPokemon = Math.floor(Math.random() * 897 + 1);
    return idPokemon;
  }

  const [isLoading, setIsLoading] = useState(false);
  

  const [randomPokemonData, setRandomPokemonData] = useState(
    {} as import('dtos/pokemon').PokemonProps
  );

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  async function handleGetRandomPokemon() {
    try {
      setIsLoading(true);
      const pokemonId = generatePokemonId();
      const pokemonData = await getPokemonById(pokemonId)
      setTimeout(() => {
       setRandomPokemonData(pokemonData);
       openModal();
       setIsLoading(false);
      }, 1000)
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <S.MapWrapper className="map">
      <Sidebar />
      <ModalCatchPokemon 
        randomPokemonData={randomPokemonData}
        closeModal={closeModal} 
        modalIsOpen={modalIsOpen} 
      />
      <Ash
        onHandleGetRandomPokemon={handleGetRandomPokemon}
        isSearching={isLoading}
      />
    </S.MapWrapper>
  );
}

export default MapPage;
