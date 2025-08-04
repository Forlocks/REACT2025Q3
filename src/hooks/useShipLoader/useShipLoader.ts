import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getShips } from '../../controllers/getShips/getShips';
import { Ship } from '../../models/Ship';

export function useShipLoader(currentPage: number) {
  const [inputValue, setInputValue] = useState('');
  const [ships, setShips] = useState<Ship[] | null>([]);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
  const controller = new AbortController();
  abortControllerRef.current = controller;

  const loadCards = async (query: string) => {
    setIsLoading(true);

    try {
      const shipResults = await getShips(query, currentPage - 1, controller);
      if (!controller.signal.aborted) {
        setPageCount(shipResults?.totalPages);
        setShips(shipResults?.spacecrafts);
      }
    } catch (error) {
      if (!controller.signal.aborted && error instanceof Error) {
        setShips(null);
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  const lastRequest = localStorage.getItem('STS last request') || '';

  setInputValue(lastRequest);
  loadCards(lastRequest);

  return () => {
    if (!abortControllerRef.current?.signal.aborted) {
      abortControllerRef.current?.abort();
    }
  };
}, [currentPage]);

  const handleSearch = async (searchValue: string = inputValue) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    navigate('/1');
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const shipResults = await getShips(searchValue.trim(), currentPage - 1, controller);
    setPageCount(shipResults?.totalPages);
    setShips(shipResults?.spacecrafts);

    setIsLoading(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return {
    inputValue,
    isLoading,
    ships,
    pageCount,
    handleInputChange,
    handleSearch,
  };
}
