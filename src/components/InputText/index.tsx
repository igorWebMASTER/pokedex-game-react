import React, { forwardRef } from 'react';

import * as S from './styled';


interface IInputDTO{
  label: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suffix?: string;
  prefix?: string;
  error?: any;
  hasShadow?: boolean;
  [propName: string]: any;
}

const InputText = forwardRef<HTMLInputElement, IInputDTO>(({ name, hasShadow, suffix ,label, type, error, ...props }, ref) => {
  return (
    <S.InputTextWrapper >
      {label && <S.Label>{label}</S.Label>}
      <S.Input 
        hasShadow  
        id={name}
        type={type}
        name={name}
        ref={ref}
        {...props}
      />

      {error && (<S.Error>{error.message}</S.Error>)}

    </S.InputTextWrapper>
  );
});


export default InputText;



