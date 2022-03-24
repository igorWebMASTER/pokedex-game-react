import React, { useState } from 'react';

import Sidebar from 'components/Sidebar';

import * as S from './styled';
import { Ash } from 'components/Ash';

function MapPage() {
  const handleSharing = async (shareDetails: any) => {
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
    <>
      <S.MapWrapper className="map">
        <button onClick={() => handleSharing(shareDetails)} style={{ zIndex: '999999999' }}>
          COMPARTILHAR
        </button>
        <Sidebar />

        <Ash />
      </S.MapWrapper>
    </>
  );
}

export default MapPage;
