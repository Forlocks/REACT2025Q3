import React, { useEffect, useState } from 'react';
import { ColumnsContext } from '../context/ColumnsContext';

interface ColumnsProps {
  children?: React.ReactNode;
}

export const Columns: React.FC<ColumnsProps> = ({ children }) => {
  const [columns, setColumns] = useState(localStorage.getItem('STS color theme') || 'dark');

  useEffect(() => {
    
  }, [Columns]);

  return (
    <ColumnsContext.Provider value={[ Columns, setColumns ]}>
      {children}
    </ColumnsContext.Provider>
  );
};
