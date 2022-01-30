import React, { useContext, useEffect, useState } from 'react';

import AshFront from 'assets/images/ashFront.png';
import AshLeftLeg from 'assets/images/ashLeftLeg.png';
import AshRightLeg from 'assets/images/ashRightLeg.png';
import AshStop from 'assets/images/ashStop.png';
import * as S from './styles';
import { Tooltip } from '../Tooltip';

import { PokedexContext } from 'context/pokedexContext';
import { PokemonProps } from '../ModalPokemonInfo';

import { useHover } from 'hooks/useHover';


export function Ash({ onHandleGetRandomPokemon, isSearching }: any) {
  const [sprite, setSprite] = useState(AshFront);
  const [tooltipStatus, setTooltipStatus] = useState("available");
  const { slots } = useContext(PokedexContext);

  const [hoverRef, isHovered] = useHover();

  function verifyPokemonAvailability() {
    const isOutOfSlots = slots.every((pokemon: PokemonProps) => pokemon.id);

    if(isOutOfSlots){
      setTooltipStatus("out");
      return;
    }

    setTooltipStatus("available");
  }

  useEffect(() => {
    if(slots){
      verifyPokemonAvailability()
    }
  },[slots])

  useEffect(() => {
      setTimeout(() => {
        switch(sprite){
          case AshFront:
            setSprite(AshLeftLeg);
            break;
          case AshLeftLeg:
            setSprite(AshRightLeg);
            break;
          case AshRightLeg:
            setSprite(AshLeftLeg);
            break;
          case AshStop:
            setSprite(AshLeftLeg);
            break;
          default:
            setSprite(AshFront);
            break;
        }
      }, 300);
  }, [sprite]);

  return (
    <S.Character tooltipStatus={tooltipStatus}>
      {isHovered && !isSearching && <Tooltip type="" loading={isSearching} status={tooltipStatus} />}
      {isSearching && <Tooltip type="" loading={isSearching} status={tooltipStatus} />}

        <div ref={hoverRef as any}>
          <img
            src={!isSearching ? AshFront : sprite}
            onClick={() => {
              if(tooltipStatus === "available"){
                onHandleGetRandomPokemon();
            }
          }}
          alt="ash" />
        </div>
    </S.Character>
  );
}
