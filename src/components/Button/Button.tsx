import React from 'react';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  onButtonClick?: () => void;
  isDisabled?: boolean;
  isCurrentButton?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onButtonClick,
  isDisabled = false,
  isCurrentButton = false,
}) => {
  return (
    <button
      className={isCurrentButton ? 'button button--current' : 'button'}
      disabled={isDisabled}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};
