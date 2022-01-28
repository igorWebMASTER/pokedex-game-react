import React, { useEffect, useState } from 'react';

import Button from 'components/Button';

import boopSfx from '../../assets/sounds/Stat Fall Down.mp3';

import iconPlus from 'assets/images/plus.png';
import pokeAvatar from 'assets/images/poke-avatar.png';

import * as S from './styled';
import { ModalPokemonInfo } from '../ModalPokemonInfo';
import { ModalAddPokemon } from '../ModalAddPokemon';
// import useSound from 'use-sound';

function Sidebar({ catchedPokemons, onHandleEditNamePokemon, onHandleReleasePokemon, onHandleAddCustomPokemon }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalAddCustomPokemon, setModaAddCustomPokemon] = useState(false);


  const [selectedPokemonData, setSelectedPokemonData] = useState([]);

  useEffect(() => {
    if (catchedPokemons) {
      setSelectedPokemonData(() => {
        const [pokemon] = catchedPokemons && catchedPokemons.filter((pokemon) => pokemon.id === selectedPokemonData.id);
        if (!pokemon) return [];
        return pokemon;
      })
    }
  }, [catchedPokemons])

  function handleSelectPokemon(pokemon) {
    setSelectedPokemonData(pokemon);
    handleOpenCatchedPokemonModal();
  }

  function handleOpenCatchedPokemonModal() {
    setIsOpen(!modalIsOpen);
  }

  // const [play] = useSound(boopSfx);

  function handleOpenAddPokemonModal() {
    setModaAddCustomPokemon(!modalAddCustomPokemon);
    play();
  }

  function handleAddCustomPokemon(data) {
    onHandleAddCustomPokemon(data);
    console.log(data)
    setModaAddCustomPokemon(!modalAddCustomPokemon);
  }

  function isEmpty(array) {
    return array.every(element => element.length !== 0);
  }

  return (
    <S.SideBarWrapper>
      <ModalPokemonInfo
        onHandleReleasePokemon={onHandleReleasePokemon}
        requestCloseModal={handleOpenCatchedPokemonModal}
        openCloseModal={modalIsOpen}
        onHandleEditNamePokemon={onHandleEditNamePokemon}
        pokemonData={selectedPokemonData}
      />
      <ModalAddPokemon
        onHandleAddCustomPokemon={handleAddCustomPokemon}
        requestCloseModal={handleOpenAddPokemonModal}
        openCloseModal={modalAddCustomPokemon}
      />
      <S.SideBarList>
        {catchedPokemons && catchedPokemons.
          map((pokemon) => {
            return (
              <S.SideBarItem isUsed={pokemon.id} key={pokemon?.id}>
                {pokemon?.id ? (
                  <img
                    loading="eager"
                    onClick={() => {
                      handleSelectPokemon(pokemon);
                    }}
                    src={
                      pokemon?.sprites?.front_default ??
                      pokeAvatar
                    }
                    width={pokemon?.sprites?.front_default ? '' : '34px'}
                    alt={pokemon?.name}
                  />
                ) : (
                  '?'
                )}
              </S.SideBarItem>
            );
          })
          .reverse()}
      </S.SideBarList>

      <Button
        onClick={handleOpenAddPokemonModal} icon={iconPlus}
        disabled={isEmpty(catchedPokemons)}
      />
    </S.SideBarWrapper>
  );
}

export default Sidebar;
