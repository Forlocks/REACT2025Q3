import React from 'react';
import './Input.scss';

interface InputProps {
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const Input: React.FC<InputProps> = ({
  inputValue,
  onInputChange,
  onSearch,
}) => {
  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <input
      className="input"
      placeholder="Ship name"
      value={inputValue}
      onChange={onInputChange}
      onKeyDown={handleEnterKeyDown}
    />
  );
};
