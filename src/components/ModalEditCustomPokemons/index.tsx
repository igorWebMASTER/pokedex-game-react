import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';

import * as S from './styles';
import { FormEditPokemon } from './FormEditPokemon';

import CloseModal from 'assets/images/close.png';
import { useUI } from 'hooks/useUI';
import { ModalHeaderRounded } from 'components/ModalAddPokemon/styles';
import { UploadImage } from 'components/UploadImage';


export function ModalEditCustomPokemons() {
  const { closeModal } = useUI();

  const [imageInfo, setImageInfo] = useState<any>([]);

  function handleSelectImage(image: any){
    setImageInfo(image);
  }

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
                  className="button-close"
                >
                  <img src={CloseModal} alt="" />
                </button>
                <ModalHeaderRounded>
                    <UploadImage images={imageInfo} handleImage={handleSelectImage} />
                </ModalHeaderRounded>
            </S.ModalHeader>
            <S.ModalBody>
              <FormEditPokemon uploadImageInfo={imageInfo}   />
            </S.ModalBody>
        </S.ModalContainer>
        </motion.div>
    </>
  );
}
