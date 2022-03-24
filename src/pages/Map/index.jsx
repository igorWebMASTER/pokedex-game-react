import React, { useEffect, useState } from 'react';

import Sidebar from 'components/Sidebar';

import { ModalGeneral } from 'components/Modal';
import * as S from './styled';

function MapPage() {
  export const handleSharing = async (shareDetails: ShareProps) => {
    console.log({ shareDetails })
    if (navigator.share) {
      try {
        await navigator
          .share(shareDetails)
          .then(() =>
            console.log("Conteúdo compartilhado com sucesso")
          );
      } catch (error) {
        console.log(`Ooops! Não foi possível compartilhar por conta desse erro: ${error}`);
      }
    } else {
      // fallback code
      console.log(
        "Compartilhamento web não suportado pelo navegador"
      );
    }
  };
  const shareDetails = {
    title: 'Compartilhar TESTE',
    text: '327890127389Y12836127836127836812632136127836781236781236'
  };
  return (
    <S.MapWrapper className="map">
      <Sidebar />
      <button onClick={() => handleSharing(shareDetails)}>
        COMPARTILHAR
      </button>
      <ModalGeneral />
    </S.MapWrapper>
  );
}

export default MapPage;
