import React from 'react';
import { createPortal } from "react-dom";
import './ModalRegistration.scss';
import { Button } from '../../components/Button/Button';

interface ModalRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalRegistration = ({isOpen, onClose, children}: ModalRegistrationProps) => {
  if (!isOpen) {
    return null;
  }

  

  return createPortal(
    <div className="modal-registration">
      <div className="modal-registration__close">
        <Button onButtonClick={onClose}>✖</Button>
      </div>
      {children}
    </div>,
    document.body
  );
};
