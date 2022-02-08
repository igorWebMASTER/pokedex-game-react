import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import * as S from './styles';
import { FormAddPokemon } from './FormAddPokemon';

import CloseModal from 'assets/images/close.png';
import { useUI } from 'hooks/useUI';
import { UploadImage } from 'components/UploadImage';



interface ModalProps {
  openCloseModal: boolean;
  requestCloseModal: () => void;
}

export function ModalAddPokemon({
}: ModalProps) {
  const { closeModal } = useUI();
  const [imageInfo, setImageInfo] = useState<any>([]);

  function handleSelectImage(image: any){
    setImageInfo(image);
  }

  useEffect(() => {
    setImageInfo([]);
  },[])

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
                <S.ModalHeaderRounded>
                    <UploadImage images={imageInfo} handleImage={handleSelectImage} />
                </S.ModalHeaderRounded>
            </S.ModalHeader>
            <S.ModalBody>
              <FormAddPokemon uploadImageInfo={imageInfo} />
            </S.ModalBody>
        </S.ModalContainer>
        </motion.div>
    </>
  );
}
