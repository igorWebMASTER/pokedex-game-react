import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';

import * as S from './styles';
import * as yup from "yup";
import Button from '../Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { getColorOfTypePokemon } from 'utils/getColorOfTypePokemon';
import { translateStats, translateType } from 'utils/translate';

import { motion } from 'framer-motion';

import CloseModal from 'assets/images/close.png'
import editIcon from 'assets/images/editIcon.png'
import CheckIcon from 'assets/images/checkIcon.png'


import InputText from 'components/InputText';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { PokemonProps } from 'dtos/pokemon';
import { HorizontalLine } from '../HorizontalLine';

import { useUI } from 'hooks/useUI';

import { PokedexContext } from 'context/pokedexContext';
import { getStatsIcon } from 'utils/getStats';

const changeNamePokemonSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Nome Inválido")
    .required("Nome Inválido")
    .matches(/^[aA-zZ\s]+$/, "Somente Letras no nome"),
});

export function ModalPokemonInfo() {
  const [openEditName, setOpenEditName] = useState(false);
  const { handleEditNamePokemon, pokedex, handleReleasePokemon } = useContext(PokedexContext)

  const { closeModal, openModal, setModalView } = useUI();

  const selectedPokemon = pokedex.find((pokemon: any) => pokemon.isSelected) as PokemonProps;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changeNamePokemonSchema),
  });

  function handleChangeName(data: PokemonProps) {
    handleEditNamePokemon(selectedPokemon.id, data.name);
    setValue('name', '');
    setOpenEditName(!openEditName)
  };

  if (!selectedPokemon?.isSelected) return null;

  return (
    <>
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
                <img src={selectedPokemon?.sprites?.front_default ?? selectedPokemon?.image?.[0]?.data_url} alt="" />
              </div>
            </S.ModalHeader>
            <S.ModalBody>
              {selectedPokemon.order ? (
                <>
                  {!openEditName && (
                    <S.ModalTextBody onClick={() => setOpenEditName(!openEditName)}>
                      {`${selectedPokemon?.name}`}
                      <img src={editIcon} alt="" />
                    </S.ModalTextBody>
                  )}
                </>
              ) : (
                <>
                  <S.ModalTextBody >
                    {`${selectedPokemon?.name}`}
                  </S.ModalTextBody>
                  <S.Text onClick={() => {
                    setModalView('EDIT_POKEMON_VIEW');
                    openModal();
                  }}
                    fontSize={1.2}
                    isHovered
                  >
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

                    <button type="button" onClick={() => {
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
                    {selectedPokemon?.base_experience ?? selectedPokemon.hp}
                  </span>
                </div>
                <div>
                  <span>
                    ALTURA
                  </span>
                  <span className="main-status">
                    {(selectedPokemon?.height / 10).toFixed(2)} M
                  </span>
                </div>
                <div>
                  <span>
                    PESO
                  </span>
                  <span className="main-status">
                    {selectedPokemon?.weight}KG
                  </span>
                </div>
              </S.ModalAbilitiesInfo>
              <br />
              <HorizontalLine title={'Tipo'} />
              <S.TypeInfoContainer>
                {Object.values(selectedPokemon?.types)?.map((info: any) => (
                  <Fragment key={info?.type?.name ?? info.name}>
                    <S.Badge
                      color={getColorOfTypePokemon(info?.type?.name ?? `${info?.value}`.toLowerCase())}
                    >
                      {translateType(info?.type?.name) || info.name}
                    </S.Badge>
                  </Fragment>
                ))}
              </S.TypeInfoContainer>
              <HorizontalLine title={'Habilidades'} />
              <S.AbilitiesInfoContainer>
                {selectedPokemon?.abilities ? selectedPokemon?.abilities?.slice(0, 2).map((abilitity: any, index: number) => (
                  <span key={abilitity?.ability?.name}>
                    {`${abilitity?.ability?.name}`}
                    {index === 0 && ', '}
                  </span>
                )) : (
                  <>
                    <span>
                      {selectedPokemon?.ability1}</span>
                    <span> {selectedPokemon?.ability2}</span>
                    <span>  {selectedPokemon?.ability3}</span>
                    <span>  {selectedPokemon?.ability4}</span>
                  </>
                )}
              </S.AbilitiesInfoContainer>
              <HorizontalLine title={'ESTATÍSTICAS'} />
              <S.StatisticsInfoContainer>
                {selectedPokemon?.stats?.map((info: any) => {
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
                  )
                })}
                {!selectedPokemon?.stats && (
                  <>
                    <S.StaticsContainer >
                      <div>
                        <img src={getStatsIcon(selectedPokemon?.attack as any)} alt={"attack"} />
                        <span>{translateStats(selectedPokemon.attack)}</span>
                      </div>
                      <div>
                        <h3>{selectedPokemon?.attack}</h3>
                      </div>
                    </S.StaticsContainer>
                    <S.StaticsContainer >
                      <div>
                        <img src={getStatsIcon("defense")} alt={"defense"} />
                        <span>{translateStats(selectedPokemon.defense)}</span>
                      </div>
                      <div>
                        <h3>{selectedPokemon?.defense}</h3>
                      </div>
                    </S.StaticsContainer>
                    <S.StaticsContainer >
                      <div>
                        <img src={getStatsIcon("special-attack")} alt={"special-attack"} />
                        <span>{translateStats(selectedPokemon.specialAttack)}</span>
                      </div>
                      <div>
                        <h3>{selectedPokemon?.specialAttack}</h3>
                      </div>
                    </S.StaticsContainer>
                    <S.StaticsContainer >
                      <div>
                        <img src={getStatsIcon("special-defense")} alt={"special-defense"} />
                        <span>{translateStats(selectedPokemon.specialDefense)}</span>
                      </div>
                      <div>
                        <h3>{selectedPokemon?.specialDefense}</h3>
                      </div>
                    </S.StaticsContainer>
                  </>
                )}
              </S.StatisticsInfoContainer>
              <S.CaptureButtonContainer>
                <Button
                  text="LIBERAR POKEMON"
                  icon={null}
                  onlyIcon=""
                  onClick={() => {
                    handleReleasePokemon(selectedPokemon?.id)
                    closeModal();
                  }}
                />
              </S.CaptureButtonContainer>
            </S.ModalBody>
          </S.ModalContainer>
        </motion.div>
      </S.ModalOverlay>
    </>
  );
}
