import React, { useContext, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '../Button/Button';
import { ColorThemeContext } from '../../context/colorThemeContext/ColorThemeContext';
import { setRootColors } from '../../controllers/setRootColors/setRootColors';
import './Header.scss';

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const location = useLocation();
  const [colorTheme, setColorTheme] = useContext(ColorThemeContext);

  const changeColorTheme = () => {
    const newColorTheme = colorTheme === 'dark' ? 'light' : 'dark';

    setColorTheme(newColorTheme);
    setRootColors(newColorTheme);

    localStorage.setItem('STS color theme', newColorTheme);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Custom error');
  }

  return (
    <header className="header">
      <div className="header__left-bar">
        <Link to="/" className="header__title">Star Trek Ships</Link>
        <Button onButtonClick={changeColorTheme}>{colorTheme === 'dark' ? '☀' : '☽'}</Button>
      </div>
      <div className="header__right-bar">
        {children}
        <Button onButtonClick={handleError}>Get error</Button>
        {location.pathname === '/about' ? (
          <NavLink to="/" className="header__nav-link">Main</NavLink>
        ) : (
          <NavLink to="/about" className="header__nav-link">About us</NavLink>
        )}
      </div>
    </header>
  );
};
