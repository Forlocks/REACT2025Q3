import React from 'react';
import { createPortal } from "react-dom";
import { Button } from '../../components/Button/Button';
import './MainPage.scss';

export const ModalRegistration: React.FC = () => {
  return createPortal(
    <div className="modal-registration">
    </div>
  );
};
