import React from "react";
import { Outlet } from "react-router";
import { useShipClassLoader } from '../../hooks/useShipClassLoader/useShipClassLoader';
import { deleteTags } from "../../controllers/deleteTags/deleteTags";
import './DetailsLayout.scss';
import spinner from '../../assets/images/spinner.webp';

export const DetailsLayout: React.FC = () => {
  const {
    isDetailsVisible,
    isEmptyDetails,
    handleHideDetails,
    error,
    isError,
    isLoading,
    isFetching,
    shipDetails,
  } = useShipClassLoader();

  let content;

  if (isEmptyDetails) {
    content = (
      <div className="details__empty">⚠ Unknown</div>
    );
  } else if (isLoading || isFetching) {
    content = (
      <div className="details__spinner">
        <img src={spinner} alt="Loading spinner" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="details__empty">
        {
          error && ('status' in error)
            ? `Error: ${error.status} — ${(error.data as { message?: string })?.message}`
            : 'An unknown error occurred'
        }
      </div>
    );
  } else {
    content = (
      <ul className="details__info">
        <li className="details__property">
          <span>Number of decks:</span>
          <span>{deleteTags(shipDetails.numberOfDecks) || 'unknown'}</span>
        </li>
        <li className="details__property">
          <span>Warp capable:</span>
          <span>{deleteTags(shipDetails.warpCapable) || 'unknown'}</span>
        </li>
        <li className="details__property">
          <span>Alternate reality:</span>
          <span>{deleteTags(shipDetails.alternateReality) || 'unknown'}</span>
        </li>
        <li className="details__property">
          <span>Active from:</span>
          <span>{deleteTags(shipDetails.activeFrom) || 'unknown'}</span>
        </li>
        <li className="details__property">
          <span>Active to:</span>
          <span>{deleteTags(shipDetails.activeTo) || 'unknown'}</span>
        </li>
        <li className="details__property">
          <span>Species:</span>
          <span>{deleteTags(shipDetails.species) || 'unknown'}</span>
        </li>
        <li className="details__property">
          <span>Affiliation:</span>
          <span>{deleteTags(shipDetails.affiliation) || 'unknown'}</span>
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
