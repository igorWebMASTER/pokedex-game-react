import React, { useEffect, useState, useContext } from 'react';

import Button from 'components/Button';

import iconPlus from 'assets/images/plus.png';
import pokeAvatar from 'assets/images/poke-avatar.png';

import * as S from './styled';
import { ModalPokemonInfo } from '../ModalPokemonInfo';
import { ModalAddPokemon } from '../ModalAddPokemon';
import { PokedexContext } from 'context/pokedexContext';
import { ModalEditCustomPokemons } from '../ModalEditCustomPokemons';

function Sidebar() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalEditPokemon, setIsOpenEditPokemon] = useState(false);
  const [modalAddCustomPokemon, setModaAddCustomPokemon] = useState(false);
  const { pokedex, handleAddCustomPokemon: onHandleAddCustomPokemon } = useContext(PokedexContext);

  const [selectedPokemonData, setSelectedPokemonData] = useState([]);

  useEffect(() => {
    if (pokedex) {
      setSelectedPokemonData(() => {
        const [pokemon] = pokedex && pokedex.filter((pokemon) => pokemon.id === selectedPokemonData.id);
       
        if (!pokemon) return [];
        return pokemon;
      })
    }
  }, [pokedex])

  function handleSelectPokemon(pokemon) {
    setSelectedPokemonData(pokemon);
    handleOpenCatchedPokemonModal();
  }

  function handleOpenCatchedPokemonModal() {
    setIsOpen(!modalIsOpen);
  }

  function handleModalEditCustomPokemon() {
    setIsOpenEditPokemon(!modalEditPokemon);
  }

  function handleOpenAddPokemonModal() {
    setModaAddCustomPokemon(!modalAddCustomPokemon);
  }

  function handleAddCustomPokemon(data) {
    onHandleAddCustomPokemon(data);
    setModaAddCustomPokemon(!modalAddCustomPokemon);
  }

  function handleEditCustomPokemon(pokemon){
    setSelectedPokemonData(pokemon);
  }

  function isEmpty(array) {
    return array.every(element => element.length !== 0);
  }

  return (
    <S.SideBarWrapper>
      <ModalPokemonInfo
        requestCloseModal={handleOpenCatchedPokemonModal}
        openCloseModal={modalIsOpen}
        handleModalEditCustomPokemon={handleModalEditCustomPokemon}
        pokemonData={selectedPokemonData}
      />
      <ModalAddPokemon
        onHandleAddCustomPokemon={handleAddCustomPokemon}
        requestCloseModal={handleOpenAddPokemonModal}
        openCloseModal={modalAddCustomPokemon}
      />
      <ModalEditCustomPokemons 
        pokemonData={selectedPokemonData} 
        onHandleEditCustomPokemon={handleEditCustomPokemon}
        requestCloseModal={handleModalEditCustomPokemon}
        openCloseModal={modalEditPokemon}
      />
      <S.SideBarList>
        {pokedex && pokedex.
          map((pokemon, index) => {
            return (
              <S.SideBarItem key={index} isUsed={pokemon.id} >
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
        disabled={isEmpty(pokedex)}
      />
    </S.SideBarWrapper>
  );
}

export default Sidebar;
