import { useState, useEffect } from 'react';
import { getShips } from '../controllers/getShips';
import { Ship } from '../models/Ship';

export function useShipLoader(initialQuery: string = '') {
  const [inputValue, setInputValue] = useState(initialQuery);
  const [ships, setShips] = useState<Ship[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchValue: string = inputValue) => {
    setIsLoading(true);

    const shipResults = await getShips(searchValue.trim());

    setShips(shipResults);
    setIsLoading(false);
  };

  useEffect(() => {
    async function loadCards(query: string) {
      setIsLoading(true);

      const shipResults = await getShips(query);

      setShips(shipResults);
      setIsLoading(false);
    }

    const lastRequest = localStorage.getItem('STS last request') || '';

    setInputValue(lastRequest);
    loadCards(lastRequest);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return {
    inputValue,
    handleInputChange,
    handleSearch,
    isLoading,
    ships,
  };
}
