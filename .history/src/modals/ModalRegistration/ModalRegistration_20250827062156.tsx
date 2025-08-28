import React from 'react';
import { createPortal } from "react-dom";
import './MainPage.scss';

export const ModalRegistration: React.FC = () => {
  return createPortal(
    <div className="modal-registration">
      {chi}
    </div>,
    document.body
  );
};
