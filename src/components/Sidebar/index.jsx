import React, { useContext } from 'react';

import Button from 'components/Button';

import iconPlus from 'assets/images/plus.png';

import * as S from './styled';
import { PokedexContext } from 'context/pokedexContext';
import { useUI } from 'hooks/useUI';
import { isFullArray } from 'utils/isFullArray';

function Sidebar() {
  const { setModalView, openModal } = useUI();
  const { pokedex, setPokedex } = useContext(PokedexContext);

  function handleSelectPokemon(pokemonId) {
    const newPokedex = pokedex.map((pokemon) => {

      const selected = pokemon.id === pokemonId;
      if (pokemon.id === pokemonId) {
        const newPokemon = {
          ...pokemon,
          isSelected: selected,
        }
        return newPokemon;
      }


      if (pokemon.isSelected) {
        const newPokemon = {
          ...pokemon,
          isSelected: false,
        }
        return newPokemon;
      }

      return {
        ...pokemon,
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
                      pokemon?.image?.[0]?.data_url
                    }
                    width={pokemon?.sprites?.front_default ? '' : '34px'}
                    alt={pokemon?.name}
                  />
                ) : (
                  '?'
                )}
              </S.SideBarItem>
            )
          }).reverse()}
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
