import React, {  Fragment, useContext, useState } from 'react';
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
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { PokedexContext } from 'context/pokedexContext';
import { PokemonProps } from 'dtos/pokemon';
import { HorizontalLine } from '../HorizontalLine';

interface ModalProps {
  pokemonData: PokemonProps;
  openCloseModal: boolean;
  handleModalEditCustomPokemon: any;
  requestCloseModal: () => void;
}

export function ModalPokemonInfo({
  pokemonData,
  openCloseModal,
  handleModalEditCustomPokemon,
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

console.log(pokemonData)
  function getStatsIcon(stat: string) {
    const stats = {
      "hp": require('../../assets/images/sword.png'),
      "attack": require('../../assets/images/sword.png'),
      "defense": require('../../assets/images/shield.png'),
      "star": require('../../assets/images/plus.png'),
      "speed": require('../../assets/images/speed.png'),
      "special-attack": require('../../assets/images/sword.png'),
      "special-defense": require('../../assets/images/shield.png'),
    } as any;

    return stats[stat] || stats.attack;
  };

  function handleChangeName(data: PokemonProps){
    handleEditNamePokemon(pokemonData.id, data.name);
    setOpenEditName(!openEditName)
    setValue('name', '');
  }

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
              {pokemonData.order ? (
                <>
                  {!openEditName && (
                    <S.ModalTextBody onClick={() => setOpenEditName(!openEditName)}>
                      {`${pokemonData?.name}`}

                        <img src={editIcon} alt="" />
                    </S.ModalTextBody>
                  )}
                </>
              ) : (
                <>
                <S.Text onClick={() => {
                    requestCloseModal()
                    handleModalEditCustomPokemon()
                  }}>
                     Editar pokemon
                  </S.Text>
                </>
              )}
            {openEditName && (
              <form onSubmit={handleSubmit(handleChangeName as SubmitHandler<FieldValues>)}>
                <S.EditNamePokemon>
                  <InputText
                    className=""
                    placeholder="Nome do Pokemon"
                    hasShadow={true}
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
            <HorizontalLine title={'Tipo'} />
              <S.TypeInfoContainer>
                {Object.values(pokemonData?.types)?.map((info: any) => (
                  <Fragment  key={info?.type?.name ?? info.name}>
                    <S.Badge
                      color={getColorOfTypePokemon(info?.type?.name ?? `${info?.value}`.toLowerCase())}
                    >
                        {translateType(info?.type?.name) || info.name }
                    </S.Badge>
                  </Fragment>
                ))}
              </S.TypeInfoContainer>
              <HorizontalLine title={'Habilidades'} />
              <S.AbilitiesInfoContainer>
                {pokemonData?.abilities ? pokemonData?.abilities?.slice(0, 2).map((abilitity: any, index: number) => (
                    <span key={abilitity?.ability?.name}>
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
               <HorizontalLine title={'ESTATÍSTICAS'} />
              <S.StatisticsInfoContainer>
              {pokemonData?.stats?.map((info: any) => {
                return (
                    <S.StaticsContainer key={info?.stat?.name}>
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
                        <img src={getStatsIcon(pokemonData?.attack as any)} alt={"attack"} />
                       <span>{translateStats(pokemonData.attack)}</span>
                       </div>
                        <div>
                            <h3>{pokemonData?.attack}</h3>
                        </div>
                    </S.StaticsContainer>
                  <S.StaticsContainer >
                      <div>
                        <img src={getStatsIcon("defense")} alt={"defense"} />
                      <span>{translateStats(pokemonData.defense)}</span>
                      </div>
                        <div>
                            <h3>{pokemonData?.defense}</h3>
                        </div>
                        </S.StaticsContainer>
                        <S.StaticsContainer >
                      <div>
                        <img src={getStatsIcon("special-attack")} alt={"special-attack"} />
                      <span>{translateStats(pokemonData.specialAttack)}</span>
                      </div>
                        <div>
                            <h3>{pokemonData?.specialAttack}</h3>
                        </div>
                    </S.StaticsContainer>
                  <S.StaticsContainer >
                      <div>
                        <img src={getStatsIcon("special-defense")} alt={"special-defense"} />
                      <span>{translateStats(pokemonData.specialDefense)}</span>
                      </div>
                        <div>
                            <h3>{pokemonData?.specialDefense}</h3>
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
