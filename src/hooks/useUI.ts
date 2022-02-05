import { useContext } from 'react';
import { UIContext } from '../context/UIContext';

export const useUI = () => {
  const context = useContext(UIContext);

  if(context === undefined) {
    throw new Error('useUI deve ser usado dentro do UIProvider')
  }

  return context;
}
