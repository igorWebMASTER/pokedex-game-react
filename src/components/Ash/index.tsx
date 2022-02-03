import React, { useContext, useEffect, useState } from 'react';

import AshFront from 'assets/images/ashFront.png';
import AshLeftLeg from 'assets/images/ashLeftLeg.png';
import AshRightLeg from 'assets/images/ashRightLeg.png';
import AshStop from 'assets/images/ashStop.png';
import * as S from './styles';
import { Tooltip } from '../Tooltip';

const blip = require("../../assets/sounds/blip.mp3");

import { PokedexContext } from 'context/pokedexContext';

import { useHover } from 'hooks/useHover';
import { PokemonProps } from 'dtos/pokemon';

import useSound from 'use-sound';


export function Ash({ onHandleGetRandomPokemon, isSearching }: any) {
  const [sprite, setSprite] = useState(AshFront);
  const [tooltipStatus, setTooltipStatus] = useState("available" );
  const { slots } = useContext(PokedexContext);

  const [hoverRef, isHovered] = useHover();

  function verifyPokemonAvailability() {
    const isOutOfSlots = slots.every((pokemon: PokemonProps) => pokemon.id);

    if(isOutOfSlots){
      setTooltipStatus("full");
      return;
    }

    setTooltipStatus("available");
  }

  const [play] = useSound(blip);

  function handleSoundSFX(status: string){
    if(status === "full"){
      play();
    }
  }

  useEffect(() => {
    if(slots){
      verifyPokemonAvailability()
    }
  },[slots])

  useEffect(() => {
    let initial = true;

    if(isSearching && initial){
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
    }

    return () => {
      initial = false
    }
  }, [sprite, isSearching]);

  function handleImage(){
    if(!isSearching ){
      return AshFront;
    }
    return sprite;
  }

  return (
    <S.Character tooltipStatus={tooltipStatus}>
      {isHovered && <Tooltip type="" loading={isSearching} status={tooltipStatus} />}
      {!isHovered && isSearching && <Tooltip loading={isSearching} status={tooltipStatus} />}
        
        <div ref={hoverRef as any}>
          <img 
            src={handleImage()}
            onClick={() => {
              if(tooltipStatus === "available"){
                onHandleGetRandomPokemon();
            }
            
          }}
          onMouseEnter={() => {
            if(tooltipStatus === "full"){
              handleSoundSFX("full");
            }
          }}
          alt="ash" />
        </div>
    </S.Character>
  );
}
