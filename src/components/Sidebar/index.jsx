import React, { useEffect, useState, useContext } from 'react';

import Button from 'components/Button';

import boopSfx from '../../assets/sounds/Stat Fall Down.mp3';

import iconPlus from 'assets/images/plus.png';
import pokeAvatar from 'assets/images/poke-avatar.png';

import * as S from './styled';
import { ModalPokemonInfo } from '../ModalPokemonInfo';
import { ModalAddPokemon } from '../ModalAddPokemon';
import { PokedexContext } from 'context/pokedexContext';
// import useSound from 'use-sound';

function Sidebar() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalAddCustomPokemon, setModaAddCustomPokemon] = useState(false);
  const { slots, handleAddCustomPokemon: onHandleAddCustomPokemon } = useContext(PokedexContext);

  const [selectedPokemonData, setSelectedPokemonData] = useState([]);

  useEffect(() => {
    if (slots) {
      setSelectedPokemonData(() => {
        const [pokemon] = slots && slots.filter((pokemon) => pokemon.id === selectedPokemonData.id);
        if (!pokemon) return [];
        return pokemon;
      })
    }
  }, [slots])

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
        requestCloseModal={handleOpenCatchedPokemonModal}
        openCloseModal={modalIsOpen}
        pokemonData={selectedPokemonData}
      />
      <ModalAddPokemon
        onHandleAddCustomPokemon={handleAddCustomPokemon}
        requestCloseModal={handleOpenAddPokemonModal}
        openCloseModal={modalAddCustomPokemon}
      />
      <S.SideBarList>
        {slots && slots.
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
        disabled={isEmpty(slots)}
      />
    </S.SideBarWrapper>
  );
}

export default Sidebar;
