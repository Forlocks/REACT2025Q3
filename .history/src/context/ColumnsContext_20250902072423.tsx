import React, { createContext } from 'react';

export type Columns = {
  cementCo2: boolean;
  cementCo2PerCapita: boolean;
  cumulativeCementCo2: boolean;
  methane: boolean;
  methanePerCapita: boolean;
  nitrousOxidePerCapita: boolean;
  nitrousOxide: boolean;
  [key: string]: boolean;
};

export const ColumnsContext = createContext<
  [Columns, React.Dispatch<React.SetStateAction<Columns>>]
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