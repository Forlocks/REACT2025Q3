import React from 'react';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  key?: number;
  onButtonClick: () => void;
  isDisabled?: boolean;
  isCurrentButton?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  key,
  onButtonClick,
  isDisabled = false,
  isCurrentButton = false,
}) => {
  return (
    <button
      key={key}
      className={isCurrentButton ? 'button button--current' : 'button'}
      disabled={isDisabled}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};
