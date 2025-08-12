import React, { useState } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { baseApi } from '../../api/baseApi';
import { useShipClassLoader } from '../../hooks/useShipClassLoader/useShipClassLoader';
import { deleteTags } from "../../controllers/deleteTags/deleteTags";
import { Button } from "../../components/Button/Button";
import './DetailsLayout.scss';
import spinner from '../../assets/images/spinner.webp';
import reset from '../../assets/images/reset.webp';

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
  const [isRotating, setIsRotating] = useState(false);

  const dispatch = useDispatch();

  const revalidateQueryCache = () => {
    dispatch(baseApi.util.invalidateTags(['ShipClass']));

    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
  }

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
          <div className="details__header">
            <div className="details__title">Ship Class</div>
            <Button onButtonClick={revalidateQueryCache}>
              <img src={reset} className={isRotating ? 'rotating' : ''} width="20" height="20" alt="Reset query cache" />
            </Button>
          </div>
          {content}
        </div>
      </aside>
    </main>
  );
};
