import React, { useEffect, useState } from 'react';

import AshFront from 'assets/images/ashFront.png';
import AshLeftLeg from 'assets/images/ashLeftLeg.png';
import AshRightLeg from 'assets/images/ashRightLeg.png';
import AshStop from 'assets/images/ashStop.png';
import * as S from './styles';
import { Tooltip } from '../Tooltip';

export function Ash({ catchedPokemons, onHandleGetRandomPokemon, isSearching }: any) {
  const [sprite, setSprite] = useState(AshFront);
  const [tooltipStatus, setTooltipStatus] = useState("");

  function verifyPokemon() {
    const isOutOfSlots = catchedPokemons.every((pokemon: { id: number; }) => pokemon.id);

    if(isOutOfSlots){
      setTooltipStatus("out");
      return;
    }
  
    setTooltipStatus("available");
  }

  useEffect(() => {
    if(catchedPokemons){
      verifyPokemon()
    }
  },[catchedPokemons])

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
