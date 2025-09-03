import React, { useEffect, useState } from 'react';
import { ColumnsContext } from '../context/ColumnsContext';
import { setRootColors } from '../controllers/setRootColors/setRootColors';

interface ColorThemeProps {
  children?: React.ReactNode;
}

export const Columns: React.FC<ColumnsProps> = ({ children }) => {
  const [Columns, setColumns] = useState(localStorage.getItem('STS color theme') || 'dark');

  useEffect(() => {
    setRootColors(Columns);
  }, [Columns]);

  return (
    <ColumnsContext.Provider value={[ Columns, setColumns ]}>
      {children}
    </ColumnsContext.Provider>
  );
};