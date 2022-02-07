import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';

import * as S from './styles';
import { FormEditPokemon } from './FormEditPokemon';

import CloseModal from 'assets/images/close.png';
import { useUI } from 'hooks/useUI';


export function ModalEditCustomPokemons() {
  const { closeModal } = useUI()

  return (
    <>
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
              </div>
            </S.ModalHeader>
            <S.ModalBody>
              <FormEditPokemon  />
            </S.ModalBody>
        </S.ModalContainer>
        </motion.div>
    </>
  );
}
