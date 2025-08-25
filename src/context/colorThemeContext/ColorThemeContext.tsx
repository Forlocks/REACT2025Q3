import React, { createContext } from 'react';

export const ColorThemeContext = createContext<
  [string | null, React.Dispatch<React.SetStateAction<string | null>>]
>([null, () => {}]);
