import React, { createRef, forwardRef } from 'react';
import Multiselect from 'multiselect-react-dropdown'

import * as S from './styles';


export const SelectType = forwardRef(({ onChange, error, handleSelectType, onBlur, name, label, ...props }: any, ref) => {

  const options = [
    { name: 'Normal', id: 1, value: 'Normal' },
    { name: 'Luta', id: 2, value: 'Fighting' },
    { name: 'Voador', id: 3, value: 'Flying' },
    { name: 'Veneno', id: 4, value: 'Poison' },
    { name: 'Terra', id: 5, value: 'Ground' },
    { name: 'Fantasma', id: 6, value: 'Ghost' },
    { name: 'Fogo', id: 7, value: 'Fire' },
    { name: 'Água', id: 8, value: 'Water' },
    { name: 'Pedra', id: 9, value: 'Rock' },
    { name: 'Gelo', id: 10, value: 'Ice' },
    { name: 'Elétrico', id: 11, value: 'Electric' },
    { name: 'Psíquico', id: 12, value: 'Psychic' },
    { name: 'Fada', id: 13, value: 'Fairy' },
    { name: 'Inseto', id: 14, value: 'Bug' },
    { name: 'Dragão', id: 15, value: 'Dragon' },
    { name: 'Grama', id: 16, value: 'Grass' },
    { name: 'Eletrico', id: 17, value: 'Electric' },
    { name: 'Aço', id: 19, value: 'Steel' },
  ];

  return (
    <>
      <label>{label}</label>
      <Multiselect
        {...props}
        selectionLimit={2}
        options={options} 
        onSelect={(value) => handleSelectType(value)} 
        onChange={handleSelectType}
        displayValue="name" 
        placeholder="Selecione o(s) tipo(s)"
      />

      {error && (<S.Error>{error.message}</S.Error>)}
    </>
  )
});