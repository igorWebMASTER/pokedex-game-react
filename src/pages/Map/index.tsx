import React, { useState } from 'react';

import Sidebar from 'components/Sidebar';

import * as S from './styled';
import { Ash } from 'components/Ash';

function MapPage() {
  return (
    <>
      <S.MapWrapper className="map">
        <Sidebar />
        <Ash />
      </S.MapWrapper>
    </>
  );
}

export default MapPage;
