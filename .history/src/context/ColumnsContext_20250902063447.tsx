import React, { createContext } from 'react';

export const ColumnsContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([
  {
    "cementCo2": false,
    "cementCo2PerCapita": false,
    "cumulativeCementCo2": false,
    "methane": false,
    "methanePerCapita": false,
    "nitrousOxidePerCapita": false,
    "nitrousOxide": false,
  },
  () => {}
]);