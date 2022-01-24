import React, { useState } from 'react';
import Modal  from 'react-modal';
import { motion } from "framer-motion"

import * as S from './styles';
import { FormAddPokemon } from './FormAddPokemon';

interface ModalProps {
  onHandleCatchedPokdemon : (info: any) => void;
}

export function ModalAddPokemon({ onHandleAddCustomPokemon ,  openCloseModal, requestCloseModal }: any) {

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          display: 'flex',
          height: 'auto',
          minWidth: '300px',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

  const onSubmit = (data: any) => {
     console.log(data)
  }

     return ( 
        <S.ModalAddCustomPokemonContainer>
                <Modal
                    isOpen={openCloseModal}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={requestCloseModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <FormAddPokemon 
                        onSubmit={onHandleAddCustomPokemon} 
                        // onHandleAddCustomPokemon={onHandleAddCustomPokemon}
                        requestCloseModal={requestCloseModal}
                    />
                </Modal>
        </S.ModalAddCustomPokemonContainer>
      );

  }
