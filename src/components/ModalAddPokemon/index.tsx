import React, { useState } from 'react';
import { motion } from 'framer-motion';

import * as S from './styles';
import { FormAddPokemon } from './FormAddPokemon';

import CloseModal from 'assets/images/close.png'

interface ModalProps {
  onHandleAddCustomPokemon: (info: any) => void;
  openCloseModal: boolean;
  requestCloseModal: () => void;
}

export function ModalAddPokemon({
  onHandleAddCustomPokemon,
  openCloseModal,
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
              <FormAddPokemon
                onSubmit={onHandleAddCustomPokemon}
                requestCloseModal={requestCloseModal}
              />
            </S.ModalBody>
        </S.ModalContainer>
        </motion.div>
      </S.ModalOverlay>)}
    </>
  );
}
