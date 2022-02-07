import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import * as S from './styles';
import { FormAddPokemon } from './FormAddPokemon';

import CloseModal from 'assets/images/close.png';

import { UploadImage } from './Components/UploadImage';

interface ModalProps {
  openCloseModal: boolean;
  requestCloseModal: () => void;
}

export function ModalAddPokemon({
  openCloseModal,
  requestCloseModal,
}: ModalProps) {
  const [images, setImages] = useState<any>([]);

  function handleSelectImage(image: any){
    setImages(image)
  }

  useEffect(() => {
    setImages([]);
  },[])

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
                  className="button-close"
                  onClick={requestCloseModal}
                >
                  <img src={CloseModal} alt="" />
                </button>
                <S.ModalHeaderRounded>
                    <UploadImage images={images} handleImage={handleSelectImage} />
                </S.ModalHeaderRounded>
            </S.ModalHeader>
            <S.ModalBody>
              <FormAddPokemon onHandleModal={requestCloseModal}  imageUrl={images} />
            </S.ModalBody>
        </S.ModalContainer>
        </motion.div>
      </S.ModalOverlay>)}
    </>
  );
}
