import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getShips } from '../controllers/getShips';
import { Ship } from '../models/Ship';

export function useShipLoader(currentPage: number) {
  const [inputValue, setInputValue] = useState('');
  const [ships, setShips] = useState<Ship[] | null>([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (searchValue: string = inputValue) => {
    navigate('/1');
    setIsLoading(true);

    const shipResults = await getShips(searchValue.trim(), currentPage - 1);

    setPageCount(shipResults?.totalPages);
    setShips(shipResults?.spacecrafts);
    setIsLoading(false);
  };

  useEffect(() => {
    async function loadCards(query: string) {
      setIsLoading(true);

      const shipResults = await getShips(query, currentPage - 1);

      setPageCount(shipResults?.totalPages);
      setShips(shipResults?.spacecrafts);
      setIsLoading(false);
    }

    const lastRequest = localStorage.getItem('STS last request') || '';

    setInputValue(lastRequest);
    loadCards(lastRequest);
  }, [currentPage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return {
    inputValue,
    handleInputChange,
    handleSearch,
    isLoading,
    ships,
    pageCount,
  };
}
