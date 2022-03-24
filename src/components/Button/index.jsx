import React from 'react';

import * as S from './styled';

function Button({ text, icon, onClick = () => console.log(), onlyIcon, ...rest }) {
  return (
    <S.ButtonWrapper
      className={`${icon ? 'icon' : ''}`}
      onClick={onClick}
      {...rest}
    >
      {icon ? <S.Icon src={icon} /> : <S.Text>{text}</S.Text>}
    </S.ButtonWrapper>
  );
}

export default Button;
