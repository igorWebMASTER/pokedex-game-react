import React, {  useContext, useState } from 'react';
import { motion } from 'framer-motion';

import * as S from './styles';
import { translateStats, translateType } from 'utils/translate';
import Button from '../Button';
import { getColorOfTypePokemon } from 'utils/getColorOfTypePokemon';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import CloseModal from 'assets/images/close.png'
import editIcon from 'assets/images/editIcon.png'
import CheckIcon from 'assets/images/checkIcon.png'

const changeNamePokemonSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Nome Inválido")
    .required("Nome Inválido")
    .matches(/^[aA-zZ\s]+$/, "Somente Letras no nome"),
});

import InputText from 'components/InputText';
import { useForm } from 'react-hook-form';
import { PokedexContext } from 'context/pokedexContext';

export interface PokemonProps {
  lenght: number;
  name: string;
  id: string;
  weight: number;
  base_experience: number;
  hp: number;
  attack?: string;
  defense?: string;
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
  abilities?: string[];
  ability1?: string;
  ability2?: string;
  ability3?: string;
  ability4?: string;
}

interface ModalProps {
  pokemonData: PokemonProps;
  openCloseModal: boolean;
  requestCloseModal: () => void;
}

export function ModalPokemonInfo({
  pokemonData,
  openCloseModal,
  requestCloseModal,
}: ModalProps) {
  const [openEditName, setOpenEditName] = useState(false);
  const { handleEditNamePokemon, handleReleasePokemon } = useContext(PokedexContext)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changeNamePokemonSchema),
  });
  
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

  function handleChangeName(data: any){
    handleEditNamePokemon(pokemonData.id, data.name);
    setOpenEditName(!openEditName)
  }


  console.log(pokemonData);
  
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
            <form onSubmit={handleSubmit(handleChangeName)}>
              <S.EditNamePokemon>
                <InputText 
                  className=""
                  placeholder="Nome do Pokemon"
                  hasShadow
                  label=""
                  type="text" 
                  {...register('name')}
                 />
                <button 
                  type="submit"
                  >
                    <img src={CheckIcon} alt="check-icon" />
                </button>

                <button type="button"onClick={() => {
                  setOpenEditName(!openEditName)
                  setValue('name', '')
                }}>
                  <img src={CloseModal} alt="close-icon" />
                </button>

            </S.EditNamePokemon>
            {errors.name && <S.Error>{errors.name.message}</S.Error>}

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
              {Object.values(pokemonData?.types)?.map((info: any) => (
                <>
                  <S.Badge 
                    key={info?.type?.name ?? info.name}
                    color={getColorOfTypePokemon(info?.type?.name ?? `${info?.value}`.toLowerCase())}
                  >
                      {translateType(info?.type?.name) || info.name }
                  </S.Badge>
              </>
                
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
              {pokemonData?.abilities ? pokemonData?.abilities?.slice(0, 2).map((abilitity: any, index: number) => (
                  <span key={index}>
                      {`${abilitity?.ability?.name}`}
                      {index === 0 && ', '}
                </span>
              )): (
                <>
                <span>
                  {pokemonData?.ability1}</span>
                 <span> {pokemonData?.ability2}</span>
                <span>  {pokemonData?.ability3}</span>
                <span>  {pokemonData?.ability4}</span>

                </>
              )}
            </S.AbilitiesInfoContainer>
            <S.HorizontalLine>
                 <div>
                 </div> 
                 <span>ESTATÍSTICAS </span>
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

                {!pokemonData?.stats && (
                  <>  
                    <S.StaticsContainer >
                    <div>
                      <img src={getStatsIcon(pokemonData?.attack as any)} alt={""} />
                     <span>{translateStats(pokemonData.attack)}</span>
                    </div>
                      <div>
                          <h3>{pokemonData?.attack}</h3> 
                      </div>

                  </S.StaticsContainer>
                <S.StaticsContainer >
                      
                    <div>
                      <img src={getStatsIcon(pokemonData?.defense as any)} alt={""} />
                     <span>{translateStats(pokemonData.defense)}</span>
                    </div>
                      <div>
                          <h3>{pokemonData?.defense}</h3> 
                      </div>
                      </S.StaticsContainer>
                  </>
                )}
                  
            </S.StatisticsInfoContainer>
            <S.CaptureButtonContainer>
              <Button
                text="LIBERAR POKEMON"
                icon=""
                onlyIcon=""
                onClick={() => {
                  handleReleasePokemon(pokemonData?.id)
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
