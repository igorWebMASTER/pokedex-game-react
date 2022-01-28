import React, { forwardRef, useCallback, useRef, useState } from 'react';

import chevron from 'assets/images/chevronDownBlack.png';

import * as S from './styled';

const InputNumber = forwardRef(({ label, placeholder, onSet, handleIncrease, handleDecrease, name, suffix, error,  ...props } : any, ref) => {
  return (  
    <S.InputNumberWrapper >
      {label && <S.Label>{label}</S.Label>}

      <S.InputContent>
        <S.Input
          ref={ref}
          type="number"
          {...props}
          placeholder={placeholder}
        />

        {suffix && <S.InputSuffix>{suffix}</S.InputSuffix>}

        <S.InputActions>
          <S.Arrow src={chevron} onClick={handleIncrease}  className="increase" alt="Mais" />
          <S.Arrow src={chevron}  onClick={handleDecrease} className="decrease" alt="Menos" />
        </S.InputActions>
      </S.InputContent>

      {error  && <S.Error>{error.message}</S.Error>}
    </S.InputNumberWrapper>
  );
})

export default InputNumber;
