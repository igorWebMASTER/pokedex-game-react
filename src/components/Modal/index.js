import { useRef, useEffect, useCallback } from 'react';
import React from 'react';
import {
  disableBodyScroll,
  clearAllBodyScrollLocks,
  enableBodyScroll,
} from 'body-scroll-lock';

import * as S from './style'

const Modal  = ({ children, onClose }) => {
  const ref = useRef();

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        return onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (ref.current) {
      disableBodyScroll(ref.current, { reserveScrollBarGap: true });
      window.addEventListener('keydown', handleKey);
    }
    return () => {
      if (ref && ref.current) {
        enableBodyScroll(ref.current);
      }
      clearAllBodyScrollLocks();
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  return (
    <S.ModalOverlay>
      <div role="dialog" ref={ref}>
        {/* <button onClick={() => onClose()} aria-label="Fechar">Fechar</button> */}
        <div>{children}</div>
      </div>
    </S.ModalOverlay>
  );
};

export default Modal;
