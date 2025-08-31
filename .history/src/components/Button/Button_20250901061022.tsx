import React from 'react';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onButtonClick?: () => void;
  isDisabled?: boolean;
  isCurrentButton?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onButtonClick,
  isDisabled = false,
  isCurrentButton = false,
}) => {
  console.log(onButtonClick);
  return (

    <button
      className={isCurrentButton ? 'button button--current' : 'button'}
      disabled={isDisabled}
      type={type}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};
