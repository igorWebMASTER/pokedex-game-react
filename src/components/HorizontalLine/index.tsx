import React from 'react';

import * as S from './styles'

type HorizontalLineProps = {
  title: string;
}

export function HorizontalLine({ title } : HorizontalLineProps) {
  return (
    <S.HorizontalLineContainer>
      <div>
        </div>
         <span>{title}</span>
        <div>
      </div>
    </S.HorizontalLineContainer>
  );
}
