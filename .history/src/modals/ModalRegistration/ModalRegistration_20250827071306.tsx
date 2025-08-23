import React, { useCallback, useEffect } from 'react';
import { createPortal } from "react-dom";
import './ModalRegistration.scss';
import { Button } from '../../components/Button/Button';

interface ModalRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalRegistration = ({isOpen, onClose, children}: ModalRegistrationProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);
  
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="modal-registration" onClick={e => e.stopPropagation()}>
      <div className="modal-registration__close">
        <Button onButtonClick={onClose}>✖</Button>
      </div>
      {children}
    </div>,
    document.body
  );
};
