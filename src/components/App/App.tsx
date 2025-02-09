import React, { useState, useEffect, useCallback } from 'react';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Header } from '../Header/Header';
import { CardsContainer } from '../CardsContainer/CardsContainer';
import { getShips } from '../../controllers/getShips';
import { Ship } from '../../models/Ship';
import './App.scss';
import spinner from '../../assets/images/spinner.webp';

export const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [ships, setShips] = useState<Ship[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(
    async (searchValue: string = inputValue) => {
      setIsLoading(true);

      const shipResults = await getShips(searchValue.trim());

      setShips(shipResults);
      setIsLoading(false);
    },
    [inputValue]
  );

  useEffect(() => {
    const lastRequest = localStorage.getItem('STS last request') || '';

    setInputValue(lastRequest);
    handleSearch(lastRequest);
  }, [handleSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  let content;

  if (ships === null) {
    content = (
      <div className="app__error-message">
        An error has occurred
        <br />
        Check your network connection, you may need a VPN.
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className="app__spinner">
        <img src={spinner} alt="Loading spinner" />
      </div>
    );
  } else if (ships.length) {
    content = <CardsContainer ships={ships} />;
  } else {
    content = <div className="app__error-message">No results found</div>;
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <Header
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSearch={() => handleSearch()}
        />
        {content}
      </div>
    </ErrorBoundary>
  );
};
