import React from 'react';
import { Link } from 'react-router';
import './NotFoundPage.scss';
import brokenShip from '../../assets/images/not-found.webp';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <img className="not-found__image" src={brokenShip} alt="Broken ship" />
      <div className="not-found__title">
        404 Page not found
        <br />
        <div>
          You can return to the&nbsp;
          <Link to="/" className="not-found__link">
            main page
          </Link>
        </div>
      </div>
    </div>
  );
};
