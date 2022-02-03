import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';

import * as S from './styles';
import { FormAddPokemon } from './FormEditPokemon';

import CloseModal from 'assets/images/close.png';


interface ModalProps {
  openCloseModal: boolean;
  pokemonData: any;
  requestCloseModal: () => void;
}

export function ModalEditCustomPokemons({
  openCloseModal,
  pokemonData,
  requestCloseModal,
}: ModalProps) {

  return (
    <>
    {openCloseModal && (<S.ModalOverlay>
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
              </div>
            </S.ModalHeader>
            <S.ModalBody>
              <FormAddPokemon onHandleModal={requestCloseModal} pokemonData={pokemonData} />
            </S.ModalBody>
        </S.ModalContainer>
        </motion.div>
      </S.ModalOverlay>)}
    </>
  );
}
