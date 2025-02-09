import { useState, useEffect } from 'react';

export const useLocalStorage = (
  key: string
): [string, (value: string) => void] => {
  const [value, setValue] = useState(() => localStorage.getItem(key) || '');

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};
