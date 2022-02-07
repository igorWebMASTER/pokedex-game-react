import React, { useContext } from 'react';

import Button from 'components/Button';

import iconPlus from 'assets/images/plus.png';
import pokeAvatar from 'assets/images/poke-avatar.png';

import * as S from './styled';
import { PokedexContext } from 'context/pokedexContext';
import { useUI } from 'hooks/useUI';
import { isFullArray } from 'utils/isFullArray';

function Sidebar() {
  const { setModalView, openModal } = useUI();
  const { pokedex, setPokedex } = useContext(PokedexContext);

  function handleSelectPokemon(pokemonId) {
    const newPokedex = pokedex.map((pokemon) => {
      if (pokemon.id === pokemonId) {
        const newPokemon = {
          ...pokemon,
          isSelected: true,
        }
        return newPokemon;
      }
      return {
        ...pokemon,
        isSelected: false,
      }
    })
    setPokedex(newPokedex);
    setModalView('INFO_POKEMON_VIEW');
    openModal();
  }


  return (
    <S.SideBarWrapper>
      <S.SideBarList>
        {pokedex && pokedex.
          map((pokemon, index) => {
            return (
              <S.SideBarItem key={index} isUsed={pokemon.id} >
                {pokemon?.id ? (
                  <img
                    loading="eager"
                    onClick={() => {
                      handleSelectPokemon(pokemon.id)
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
            )}).reverse()}
      </S.SideBarList>

      <Button
        onClick={() => {
          setModalView('ADD_POKEMON_VIEW')
          openModal();
        }}
        icon={iconPlus}
        disabled={isFullArray(pokedex)}
      />
    </S.SideBarWrapper>
  );
}

export default Sidebar;
