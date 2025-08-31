import React, { createContext } from 'react';

export const ColumnsContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([
  {
    "cementCo2": false,
    "cementCo2PerCapita",
    "cumulativeCementCo2",
    "methane",
    "methanePerCapita",
    "nitrousOxidePerCapita",
    "nitrousOxide",
  },
  () => {}
]);