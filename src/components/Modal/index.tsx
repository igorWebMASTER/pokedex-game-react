import React, { useState } from 'react';

import * as S from './styles';
import { Ash } from '../Ash';

import PokeBall from 'assets/images/pokeball.png'
import CloseModal from 'assets/images/close.png'

import { motion } from 'framer-motion';
import { translateType } from 'utils/translate';
import { getPokemonById } from 'app/api';
import { getColorOfTypePokemon } from 'utils/getColorOfTypePokemon';

interface PokemonProps {
  lenght: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: string[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

interface ModalProps {
  catchedPokemons: PokemonProps[];
  onHandleCatchedPokdemon: (info: any) => void;
}

export function ModalGeneral({ catchedPokemons,  onHandleCatchedPokdemon }: ModalProps)  {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [randomPokemonData, setRandomPokemonData] = useState<PokemonProps>(
    {} as PokemonProps
  );

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function generatePokemonId() {
    const idPokemon = Math.floor(Math.random() * 897 + 1);
    return idPokemon;
  }

  async function handleGetRandomPokemon() {
    try {
      setIsLoading(true);
      const pokemonId = generatePokemonId();
      const pokemonData = await getPokemonById(pokemonId)
      setTimeout(() => {
       setRandomPokemonData(pokemonData);
       openModal();
       setIsLoading(false);
      }, 1000)
    } catch (e) {
      console.log(e);
    } 
  }

  return (
    <>
      <Ash
        onHandleGetRandomPokemon={handleGetRandomPokemon}
        isSearching={isLoading}
        catchedPokemons={catchedPokemons}
      />
      {modalIsOpen && (
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
              <br />
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
              <S.HorizontalLine>
                   <div>
                   </div> 
                   <span>Tipo </span>
                   <div>
                   </div>
              </S.HorizontalLine>

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

               <S.HorizontalLine>
                   <div>
                   </div> 
                     <span>HABILIDADES </span>
                    <div>
                    </div>
              </S.HorizontalLine>
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
                    onHandleCatchedPokdemon(randomPokemonData)
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
       )} 
     </>
  );
}
