import React from 'react';
import { createPortal } from "react-dom";
import './MainPage.scss';
import { Button } from '../../components/Button/Button';

interface ModalRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalRegistration: React.FC = () => {
  return createPortal(
    <div className="modal-registration">
      <Button onButtonClick={onClose}>×</Button>
      {children}
    </div>,
    document.body
  );
};
