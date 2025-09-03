import React, { createContext } from 'react';

export type ColumnsState = {
  cementCo2: boolean;
  cementCo2PerCapita: boolean;
  cumulativeCementCo2: boolean;
  methane: boolean;
  methanePerCapita: boolean;
  nitrousOxidePerCapita: boolean;
  nitrousOxide: boolean;
};

export const ColumnsContext = createContext<
  [ColumnsState, React.Dispatch<React.SetStateAction<ColumnsState>>]
>([
  {
    cementCo2: false,
    cementCo2PerCapita: false,
    cumulativeCementCo2: false,
    methane: false,
    methanePerCapita: false,
    nitrousOxidePerCapita: false,
    nitrousOxide: false,
  },
  () => {}
]);