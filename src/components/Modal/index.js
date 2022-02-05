import { useRef, useEffect, useCallback } from 'react';
import React from 'react';
import {
  disableBodyScroll,
  clearAllBodyScrollLocks,
  enableBodyScroll,
} from 'body-scroll-lock';


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
    <div>
      <div role="dialog" ref={ref}>
        <button onClick={() => onClose()} aria-label="Fechar"></button>dsadasdasd
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
