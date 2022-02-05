import React, { useContext, useState } from 'react';

import * as S from './styles';

import PokeBall from 'assets/images/pokeball.png'
import CloseModal from 'assets/images/close.png'

import { motion } from 'framer-motion';
import { translateType } from 'utils/translate';
import { getColorOfTypePokemon } from 'utils/getColorOfTypePokemon';

import { PokedexContext } from 'context/pokedexContext';
import { useUI } from 'hooks/useUI';
import { HorizontalLine } from 'components/HorizontalLine';

export function ModalCatchPokemon({ randomPokemonData}: any)  {
  const {  addPokemonToSlots } = useContext(PokedexContext);
  const {  closeModal } = useUI() as any;

  console.log({randomPokemonData})

  if(randomPokemonData.lenght <= 0){
    return null;
  }

  return (
    <>

      {/* {modalIsOpen && ( */}\
        <S.ModalOverlay>
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
          <S.ModalContainer>
            <S.ModalHeader>
              <button
                type="button"
                onClick={closeModal}
              >
                <img src={CloseModal} alt="" />
              </button>
              <div>
                <img src={randomPokemonData?.sprites?.front_default} alt="" />
              </div>
            </S.ModalHeader>
            <S.ModalBody>
              <S.ModalTextBody>
              {`${randomPokemonData?.name}`}
              </S.ModalTextBody>
              <S.ModalAbilitiesInfo>
                <div>
                  <span>
                    HP
                  </span>
                  <span className="main-status">
                    {randomPokemonData?.stats?.find(
                      (stat: any) => stat.stat.name === 'hp'
                    )?.base_stat}

                  </span>
                </div>
                <div>
                  <span>
                    ALTURA
                  </span>
                  <span className="main-status">
                    {(randomPokemonData?.height / 10).toFixed(2)} M
                  </span>
                </div>
                <div>
                  <span>
                    PESO
                  </span>
                  <span className="main-status">
                    {randomPokemonData?.weight}KG
                  </span>
                </div>
              </S.ModalAbilitiesInfo>
              <br />
              <HorizontalLine title={'Tipo'} />
              <S.TypeInfoContainer>
                {randomPokemonData?.types?.map((info: any) => (
                  <S.Badge
                    key={info.type.name}
                    color={getColorOfTypePokemon(info?.type?.name)}
                  >
                      {translateType(info.type.name)}
                  </S.Badge>
                ))}
               </S.TypeInfoContainer>
               <HorizontalLine title={'HABILIDADES'} />
              <S.AbilitiesInfoContainer>
              {randomPokemonData?.abilities?.slice(0, 2).map((info: any, index: number) => (
                      <span key={info.ability.name}>
                          {info.ability.name}
                     </span>
                ))}
              </S.AbilitiesInfoContainer>
              <S.CaptureButtonContainer>
                <S.ButtonCatchPokemon
                  type="button"
                  onClick={() => {
                    addPokemonToSlots(randomPokemonData)
                    closeModal();
                  }}
                >
                  <img src={PokeBall} alt="pokeball" />
                </S.ButtonCatchPokemon>
              </S.CaptureButtonContainer>
            </S.ModalBody>
          </S.ModalContainer>
         </motion.div>
       </S.ModalOverlay>
       {/* )} */}
     </>
  );
}
