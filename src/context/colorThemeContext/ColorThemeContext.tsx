import React, { createContext } from 'react';

export const ColorThemeContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([
  'dark',
  () => {}
]);
