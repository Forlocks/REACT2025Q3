import React from 'react';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  onButtonClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onButtonClick }) => {
  return (
    <button className="button" onClick={onButtonClick}>
      {children}
    </button>
  );
};
