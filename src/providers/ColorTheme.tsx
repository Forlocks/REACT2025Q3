'use client';

import React, { useEffect, useState } from 'react';
import { ColorThemeContext } from '../context/colorThemeContext/ColorThemeContext';
import { setRootColors } from '../controllers/setRootColors/setRootColors';

interface ColorThemeProps {
  children?: React.ReactNode;
}

export const ColorTheme: React.FC<ColorThemeProps> = ({ children }) => {
  const [colorTheme, setColorTheme] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('STS color theme') || 'dark';
    setColorTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (colorTheme) {
      setRootColors(colorTheme);
    }
  }, [colorTheme]);

  if (!colorTheme) {
    return null;
  }

  return (
    <ColorThemeContext.Provider value={[colorTheme, setColorTheme]}>
      {children}
    </ColorThemeContext.Provider>
  );
};
