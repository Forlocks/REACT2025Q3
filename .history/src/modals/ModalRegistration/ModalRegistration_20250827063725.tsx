import React from 'react';
import { createPortal } from "react-dom";
import './MainPage.scss';
import { Button } from '../../components/Button/Button';

interface ModalRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalRegistration: React.FC = ({isOpen, onClose, children}: ModalRegistrationProps) => {
  if 

  return createPortal(
    <div className="modal-registration">
      <Button onButtonClick={onClose}>×</Button>
      {children}
    </div>,
    document.body
  );
};
