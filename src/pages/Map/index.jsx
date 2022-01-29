import React, { useEffect, useState } from 'react';

import Sidebar from 'components/Sidebar';

import { ModalGeneral } from 'components/Modal';
import * as S from './styled';

function MapPage() {

  return (
    <S.MapWrapper className="map">
      <Sidebar />
      <ModalGeneral />
    </S.MapWrapper>
  );
}

export default MapPage;
