import React from 'react';
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
          <a className="not-found__link" href="/">
            main page
          </a>
        </div>
      </div>
    </div>
  );
};
