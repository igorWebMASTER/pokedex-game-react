import React, { useEffect } from 'react';

import * as S from "./styles";

import AshFront from 'assets/images/ashFront.png';
import AshLeftLeg from 'assets/images/ashLeftLeg.png';
import AshRightLeg from 'assets/images/ashRightLeg.png';
import AshStop from 'assets/images/ashStop.png';

export function Ash({ onHandleGetRandomPokemon , isSearching   }: any) {
  const [sprite, setSprite] = React.useState(AshFront);
  
  useEffect(() => {
    setTimeout(() => {
      if(sprite === AshFront) {
        setSprite(AshLeftLeg);
      }
      else if(sprite === AshLeftLeg) {
        setSprite(AshRightLeg);
      }
      else if(sprite === AshRightLeg) {
        setSprite(AshStop);
      }
      else if(sprite === AshStop) {
        setSprite(AshFront);
      }
    }, 300)
  }, [sprite]);


  return (
    <S.Character >
     {!isSearching && (
      <img src={AshFront} alt="ash" onClick={() => {
          onHandleGetRandomPokemon()
        }} 
      />
     )}
     {isSearching && <img src={sprite} alt="ash" />}
   </S.Character>
  );
}
