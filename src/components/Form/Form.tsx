import React from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import './Form.scss';

interface FormProps {
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const Form: React.FC<FormProps> = ({
  inputValue,
  onInputChange,
  onSearch,
}) => {
  return (
    <div className="form">
      <Input
        inputValue={inputValue}
        onInputChange={onInputChange}
        onSearch={onSearch}
      />
      <Button onButtonClick={onSearch}>Search</Button>
    </div>
  );
};
