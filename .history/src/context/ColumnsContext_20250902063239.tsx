import React, { createContext } from 'react';

export const ColumnsContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([
  'dark',
  () => {}
]);