import React, { useEffect, useState } from 'react';
import { ColumnsContext } from '../context/ColumnsContext';

interface ColumnsProps {
  children?: React.ReactNode;
}

export const Columns: React.FC<ColumnsProps> = ({ children }) => {
  const [columns, setColumns] = useState();

  useEffect(() => {
    
  }, [columns]);

  return (
    <ColumnsContext.Provider value={[ columns, setColumns ]}>
      {children}
    </ColumnsContext.Provider>
  );
};
