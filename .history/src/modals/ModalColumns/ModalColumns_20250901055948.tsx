import { useCallback, useEffect } from 'react';
import { createPortal } from "react-dom";
import { Button } from '../../components/Button/Button';
import './ModalColumns.scss';

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
    <div data-testid="modal" className="modal" onClick={e => e.stopPropagation()}>
      <div className="modal__close">
        <Button onButtonClick={onClose}>✖</Button>
      </div>
      <h2 className="modal__title">Select columns</h2>
      {children}
    </div>,
    document.body
  );
};
