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
import { useUI } from 'hooks/useUI';
import { PokemonContext } from 'context/pokemonContext';


export function Ash() {
  const [sprite, setSprite] = useState(AshFront);
  const [tooltipStatus, setTooltipStatus] = useState("available" );
  const { pokedex } = useContext(PokedexContext);
  const {  isLoading: isSearching, handleGetRandomPokemon } = useContext(PokemonContext);

  const {  setModalView, openModal } = useUI();

  const [hoverRef, isHovered] = useHover();

  function verifyPokemonAvailability() {
    const isOutOfSlots = pokedex.every((pokemon: PokemonProps) => pokemon.id);

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
    if(pokedex){
      verifyPokemonAvailability()
    }
  },[pokedex]);

  let timerSprite = setTimeout(() => {
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

  useEffect(() => {
    let initial = true;

    if(isSearching && initial){
      timerSprite
    }

    return () => {
      clearTimeout(timerSprite)
    }
  }, [isSearching]);

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
              if(tooltipStatus === "available" && !isSearching) {
                handleGetRandomPokemon();
                setModalView('CATCH_POKEMON_VIEW')
                openModal()
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
