import React, { useContext, useEffect, useState } from 'react';

import AshFront from 'assets/images/ashFront.png';
import AshLeftLeg from 'assets/images/ashLeftLeg.png';
import AshRightLeg from 'assets/images/ashRightLeg.png';
import AshStop from 'assets/images/ashStop.png';
import * as S from './styles';
import { Tooltip } from '../Tooltip';

import { PokedexContext } from 'context/pokedexContext';
import { PokemonProps } from '../ModalPokemonInfo';


export function Ash({ onHandleGetRandomPokemon, isSearching }: any) {
  const [sprite, setSprite] = useState(AshFront);
  const [tooltipStatus, setTooltipStatus] = useState("");
  const { slots } = useContext(PokedexContext)

  function verifyPokemon() {
    const isOutOfSlots = slots.every((pokemon: PokemonProps) => pokemon.id);

    if(isOutOfSlots){
      setTooltipStatus("out");
      return;
    }
  
    setTooltipStatus("available");
  }

  useEffect(() => {
    if(slots){
      verifyPokemon()
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
      <Tooltip type="" loading={isSearching} status={tooltipStatus} />
        {!isSearching && (
          <img
            src={AshFront}
            alt="ash"
            onClick={() => {
              if(tooltipStatus === "available"){
                onHandleGetRandomPokemon();
              }
            }}
          />
        )}
      {isSearching && <img src={sprite} alt="ash" />}
    </S.Character>
  );
}
