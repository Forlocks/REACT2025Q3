import React, { useEffect, useState } from 'react';
import { ColorThemeContext } from '../context/colorThemeContext/ColorThemeContext';
import { setRootColors } from '../controllers/setRootColors/setRootColors';

interface ColorThemeProps {
  children?: React.ReactNode;
}

export const ColorTheme: React.FC<ColorThemeProps> = ({ children }) => {
  const [colorTheme, setColorTheme] = useState(localStorage.getItem('STS color theme') || 'dark');

  useEffect(() => {
    setRootColors(colorTheme);
  }, [colorTheme]);

  return (
    <ColorThemeContext.Provider value={[ colorTheme, setColorTheme ]}>
      {children}
    </ColorThemeContext.Provider>
  );
};
