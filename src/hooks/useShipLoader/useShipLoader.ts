import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetShipsQuery } from "../../api/shipsApi";

export function useShipLoader(currentPage: number) {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { data, isLoading } = useGetShipsQuery({
      key: query,
      page: currentPage - 1
  });

  const handleSearch = (searchValue: string = inputValue) => {
    navigate('/1');
    setQuery(searchValue.trim());
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return {
    inputValue,
    isLoading,
    ships: data?.spacecrafts ?? [],
    pageCount: data?.totalPages ?? 0,
    handleInputChange,
    handleSearch,
  };
}
