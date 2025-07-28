import React from "react";
import { Outlet } from "react-router";
import { useShipClassLoader } from '../../hooks/useShipClassLoader';
import './DetailsLayout.scss';
import spinner from '../../assets/images/spinner.webp';

export const DetailsLayout: React.FC = () => {
  const {
    isDetailsVisible,
    isEmptyDetails,
    isLoading,
    shipDetails,
    handleHideDetails,
  } = useShipClassLoader();

  let content;

  if (isEmptyDetails) {
    content = (
      <div className="details__empty">⚠ Unknown</div>
    );
  } else if (isLoading) {
    content = (
      <div className="details__spinner">
        <img src={spinner} alt="Loading spinner" />
      </div>
    );
  } else {
    content = (
      <ul className="details__info">
        <li className="details__property">
          <span>Number of decks:</span>
          <span>{shipDetails.numberOfDecks}</span>
        </li>
        <li className="details__property">
          <span>Warp capable:</span>
          <span>{shipDetails.warpCapable}</span>
        </li>
        <li className="details__property">
          <span>Alternate reality:</span>
          <span>{shipDetails.alternateReality}</span>
        </li>
        <li className="details__property">
          <span>Active from:</span>
          <span>{shipDetails.activeFrom}</span>
        </li>
        <li className="details__property">
          <span>Active to:</span>
          <span>{shipDetails.activeTo}</span>
        </li>
        <li className="details__property">
          <span>Species:</span>
          <span>{shipDetails.species}</span>
        </li>
        <li className="details__property">
          <span>Affiliation:</span>
          <span>{shipDetails.affiliation}</span>
        </li>
      </ul>
    );
  }

  return (
    <main className="main">
      <Outlet />
      <aside className={isDetailsVisible ? 'details details_visible' : 'details'}>
        <div className="details__button" onClick={handleHideDetails}>&#62;</div>
        <div className="details__container">
          <div className="details__title">Ship Class</div>
          {content}
        </div>
      </aside>
    </main>
  );
};
