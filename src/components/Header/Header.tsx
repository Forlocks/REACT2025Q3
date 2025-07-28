import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '../Button/Button';
import './Header.scss';

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const location = useLocation();

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Custom error');
  }

  return (
    <header className="header">
      <Link to="/" className="header__title">Star Trek Ships</Link>
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
