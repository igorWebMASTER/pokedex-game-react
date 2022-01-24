import React, { useState } from 'react';
import Modal  from 'react-modal';
import { motion } from "framer-motion"

import * as S from './styles';
import capitalize from 'utils/capitalize';

interface PokemonProps {
  lenght: number;
  name: string;
  weight: number;
  height: number;
  sprites : {
    front_default: string;
  }
}

interface ModalProps {
  onHandleCatchedPokdemon : (info: any) => void;
}

export function ModalPokemonInfo({ onHandleReleasePokemon , pokemonData,  openCloseModal, requestCloseModal }: any) {

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          height: 'auto',
          minWidth: '300px',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };


     return ( 
        <S.ModalContainer>
            {openCloseModal && (
              <motion.div
                animate={{ x: 100 }}
                transition={{ ease: "easeOut", duration: 2 }}
              >
                <Modal
                    isOpen={openCloseModal}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={requestCloseModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
    
    
                    <img src={pokemonData?.sprites?.front_default} alt="" />
                    {`${capitalize(pokemonData?.name)}`} <br/>
                    
                    HP       ALTURA      PESO
                    45/45     {pokemonData?.height}CM   {pokemonData?.weight}KG
                    <br />
                    <button type="button" onClick={() => {
                      onHandleReleasePokemon(pokemonData?.id)
                      requestCloseModal()
                    }}>
                      LIBERAR
                    </button>
                </Modal>
              </motion.div>
            )}
        </S.ModalContainer>
      );

  }
