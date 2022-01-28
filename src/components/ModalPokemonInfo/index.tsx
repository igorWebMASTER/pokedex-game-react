import React, { Fragment, useState } from 'react';
import { motion } from 'framer-motion';

import * as S from './styles';
import { translateStats, translateType } from 'utils/translate';
import Button from '../Button';
import { getColorOfTypePokemon } from 'utils/getColorOfTypePokemon';

import CloseModal from 'assets/images/close.png'
import editIcon from 'assets/images/editIcon.png'
import CheckIcon from 'assets/images/checkIcon.png'

import InputText from 'components/InputText';

export interface PokemonProps {
  lenght: number;
  name: string;
  id: string;
  weight: number;
  base_experience: number;
  hp: number;
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
  abilities: string[];
}

interface ModalProps {
  pokemonData: PokemonProps;
  onHandleReleasePokemon: (info: any) => void;
  onHandleEditNamePokemon: (info: any, name: string) => void;
  openCloseModal: boolean;
  requestCloseModal: () => void;
}

export function ModalPokemonInfo({
  pokemonData,
  onHandleReleasePokemon,
  onHandleEditNamePokemon,
  openCloseModal,
  requestCloseModal,
}: ModalProps) {
  const [openEditName, setOpenEditName] = useState(false);
  const [editName, setEditName] = useState('');
  
  function getStatsIcon(stat: string) {
    const stats = {
      hp: require('../../assets/images/sword.png'),
      attack: require('../../assets/images/shield.png'),
      shield: require('../../assets/images/shield.png'),
      star: require('../../assets/images/plus.png'),
      speed: require('../../assets/images/sword.png'),
    } as any;
  
    return stats[stat] || stats.attack;
  };
  
  return (
    <>
      {openCloseModal && (
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
                onClick={requestCloseModal}
              >
                <img src={CloseModal} alt="" />
              </button>
            <div>
              <img src={pokemonData?.sprites?.front_default} alt="" />
            </div>
          </S.ModalHeader>
          <S.ModalBody>
            {!openEditName && (
              <S.ModalTextBody onClick={() => setOpenEditName(!openEditName)}>
                {`${pokemonData?.name}`} 

                <img src={editIcon} alt="" />
              </S.ModalTextBody>
            )}
          {openEditName && (
            <form>
              <S.EditNamePokemon>
                <InputText 
                  className=""
                  placeholder="Nome do Pokemon"
                  name="name"
                  hasShadow
                  label=""
                  type="text" 
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) =>  {
                  setEditName(e.target.value)
                
                }} />
                <button 
                  
                  onClick={() => {
                  if(editName === '') return;
                  onHandleEditNamePokemon(pokemonData.id, editName);
                  setOpenEditName(!openEditName)
                  setEditName('')
                }}>
                    <img src={CheckIcon} alt="check-icon" />
                </button>
                <button onClick={() => setOpenEditName(!openEditName)}>
                  <img src={CloseModal} alt="close-icon" />
                </button>
            </S.EditNamePokemon>
            </form>
          )}
            <br />
            <S.ModalAbilitiesInfo>
              <div>
                <span>
                  HP
                </span>
                <span className="main-status">
                  {/* {pokemonData?.stats?.find(  
                    (stat: any) => stat.stat.name === 'hp'
                  )?.base_stat} */}
                  {pokemonData?.base_experience ??  pokemonData.hp}
                </span>
              </div>
              <div>
                <span>
                  ALTURA
                </span>
                <span className="main-status">
                  {(pokemonData?.height / 10).toFixed(2)} M
                </span>
              </div>
              <div>
                <span>
                  PESO
                </span>
                <span className="main-status">
                  {pokemonData?.weight}KG
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
              {pokemonData?.types?.map((info: any) => (
                <S.Badge 
                  key={info?.type?.name ?? info?.name}
                  color={getColorOfTypePokemon(info?.type?.name ?? info?.name)}
                >
                    {translateType(info?.type?.name ?? info?.name)}
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
              {pokemonData?.abilities?.slice(0, 2).map((info: any, index: number) => (
                  <span key={index}>
                      {info?.ability?.name}
                      {index === 0 ? ' ' : ','}
                </span>
              ))}
            </S.AbilitiesInfoContainer>
            <S.HorizontalLine>
                 <div>
                 </div> 
                 <span>ESTATISTICAS </span>
                 <div>
                 </div>
            </S.HorizontalLine>
            <S.StatisticsInfoContainer>
            {pokemonData?.stats?.map((info: any, index) => {
              return (
                  <S.StaticsContainer key={index}>
                    <div>
                      <img src={getStatsIcon(info?.stat?.name)} alt={""} />
                     <span>{translateStats(info?.stat?.name)}</span>
                    </div>
                      <div key={info?.stat?.name}>
                          <h3>{info?.base_stat}</h3> 
                      </div>
                  </S.StaticsContainer>
                )})}
            </S.StatisticsInfoContainer>
            <S.CaptureButtonContainer>
              <Button
                text="LIBERAR POKEMON"
                icon=""
                onlyIcon=""
                onClick={() => {
                  onHandleReleasePokemon(pokemonData?.id)
                  requestCloseModal();
                }}
              />
            </S.CaptureButtonContainer>
          </S.ModalBody>
        </S.ModalContainer>
       </motion.div>
     </S.ModalOverlay>
     )}
     </>
  );
}
