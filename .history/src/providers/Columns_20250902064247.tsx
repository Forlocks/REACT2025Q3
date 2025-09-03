import React, { useState } from 'react';
import { ColumnsContext } from '../context/ColumnsContext';
import { ColumnsState } from '../context/ColumnsContext';

interface ColumnsProps {
  children?: React.ReactNode;
}

export const Columns: React.FC<ColumnsProps> = ({ children }) => {
  const [columns, setColumns] = useState<>({});

  return (
    <ColumnsContext.Provider value={[ columns, setColumns ]}>
      {children}
    </ColumnsContext.Provider>
  );
};
