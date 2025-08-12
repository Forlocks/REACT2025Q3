import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetShipsQuery } from "../../api/shipsApi";

export function useShipLoader(currentPage: number) {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const lastRequest = localStorage.getItem('STS last request') || '';

    setInputValue(lastRequest);
    setQuery(lastRequest);
  }, []);

  const { data, error, isError, isLoading, isFetching } = useGetShipsQuery({
    key: query,
    page: currentPage - 1,
  });

  const handleSearch = (searchValue: string = inputValue) => {
    localStorage.setItem('STS last request', searchValue);

    navigate('/1');
    setQuery(searchValue.trim());
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return {
    inputValue,
    handleInputChange,
    handleSearch,
    error,
    isError,
    isLoading,
    isFetching,
    ships: data?.spacecrafts ?? [],
    pageCount: data?.totalPages ?? 0,
  };
}
