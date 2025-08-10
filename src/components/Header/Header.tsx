import React, { useContext, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { baseApi } from '../../api/baseApi';
import { Button } from '../Button/Button';
import { ColorThemeContext } from '../../context/colorThemeContext/ColorThemeContext';
import { setRootColors } from '../../controllers/setRootColors/setRootColors';
import './Header.scss';
import reset from '../../assets/images/reset.webp';

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const location = useLocation();
  const [colorTheme, setColorTheme] = useContext(ColorThemeContext);

  const dispatch = useDispatch();

  const changeColorTheme = () => {
    const newColorTheme = colorTheme === 'dark' ? 'light' : 'dark';

    setColorTheme(newColorTheme);
    setRootColors(newColorTheme);

    localStorage.setItem('STS color theme', newColorTheme);
  };

  const revalidateQueryCache = () => {
    dispatch(baseApi.util.invalidateTags(['Ships']));

    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
  }

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
        <Button onButtonClick={revalidateQueryCache}>
          <img src={reset} className={isRotating ? 'rotating' : ''} width="20" height="20" alt="Reset query cache" />
        </Button>
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
