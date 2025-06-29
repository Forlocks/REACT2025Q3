import React, { useState } from 'react';
import { Form } from '../Form/Form';
import { Button } from '../Button/Button';
import './Header.scss';

interface HeaderProps {
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  inputValue,
  onInputChange,
  onSearch,
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Custom error');
  }

  return (
    <header className="header">
      <a className="header__title" href="/">Star Trek Ships</a>
      <div className="header__right-bar">
        <Form
          inputValue={inputValue}
          onInputChange={onInputChange}
          onSearch={onSearch}
        />
        <Button onButtonClick={handleError}>Get error</Button>
      </div>
    </header>
  );
};
