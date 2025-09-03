import React, { createContext } from 'react';

export const ColumnsContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([
  {
    <Checkbox onCheckboxChange={handleCheckboxChange}>Cement co2</Checkbox>
              <Checkbox onCheckboxChange={handleCheckboxChange}>Cement co2 per capita</Checkbox>
              <Checkbox onCheckboxChange={handleCheckboxChange}>Cumulative cement co2</Checkbox>
              <Checkbox onCheckboxChange={handleCheckboxChange}>Methane</Checkbox>
              <Checkbox onCheckboxChange={handleCheckboxChange}>Methane per capita</Checkbox>
              <Checkbox onCheckboxChange={handleCheckboxChange}>Nitrous oxide per capita</Checkbox>
              <Checkbox onCheckboxChange={handleCheckboxChange}>Nitrous oxide</Checkbox>
  },
  () => {}
]);