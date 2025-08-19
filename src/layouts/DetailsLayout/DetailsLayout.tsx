'use client';

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { baseApi } from '../../api/baseApi';
import { useShipClassLoader } from '../../hooks/useShipClassLoader/useShipClassLoader';
import { deleteTags } from "../../controllers/deleteTags/deleteTags";
import { Button } from "../../components/Button/Button";
import './DetailsLayout.scss';
import spinner from '../../assets/images/spinner.webp';
import reset from '../../assets/images/reset.webp';

interface DetailsLayoutProps {
  children: React.ReactNode;
}

export const DetailsLayout: React.FC<DetailsLayoutProps> = ({ children }) => {
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
  const t = useTranslations('Details');

  const dispatch = useDispatch();

  const unknownText = t('unknown');

  const revalidateQueryCache = () => {
    dispatch(baseApi.util.invalidateTags(['ShipClass']));

    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
  }

  let content;

  if (isEmptyDetails) {
    content = (
      <div className="details__empty">⚠ {t('noResults')}</div>
    );
  } else if (isLoading || isFetching) {
    content = (
      <div className="details__spinner">
        <Image src={spinner} alt="Loading spinner" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="details__empty">
        {
          error && ('status' in error)
            ? `Error: ${error.status} — ${(error.data as { message?: string })?.message}`
            : t('error')
        }
      </div>
    );
  } else {
    content = (
      <ul className="details__info">
        <li className="details__property">
          <span>{t('numberOfDecks')}</span>
          <span>{deleteTags(shipDetails.numberOfDecks) || unknownText}</span>
        </li>
        <li className="details__property">
          <span>{t('warpCapable')}</span>
          <span>{deleteTags(shipDetails.warpCapable) || unknownText}</span>
        </li>
        <li className="details__property">
          <span>{t('alternateReality')}</span>
          <span>{deleteTags(shipDetails.alternateReality) || unknownText}</span>
        </li>
        <li className="details__property">
          <span>{t('activeFrom')}</span>
          <span>{deleteTags(shipDetails.activeFrom) || unknownText}</span>
        </li>
        <li className="details__property">
          <span>{t('activeTo')}</span>
          <span>{deleteTags(shipDetails.activeTo) || unknownText}</span>
        </li>
        <li className="details__property">
          <span>{t('species')}</span>
          <span>{typeof shipDetails.species === 'string' || deleteTags(shipDetails.species?.name || unknownText)}</span>
        </li>
        <li className="details__property">
          <span>{t('affiliation')}</span>
          <span>{typeof shipDetails.affiliation === 'string' || deleteTags(shipDetails.affiliation?.name || unknownText)}</span>
        </li>
      </ul>
    );
  }

  return (
    <main className="main">
      {children}
      <aside className={isDetailsVisible ? 'details details_visible' : 'details'}>
        <div className="details__button" onClick={handleHideDetails}>&#62;</div>
        <div className="details__container">
          <div className="details__header">
            <div className="details__title">{t('title')}</div>
            <Button onButtonClick={revalidateQueryCache}>
              <Image src={reset} className={isRotating ? 'rotating' : ''} width="20" height="20" alt="Reset query cache" />
            </Button>
          </div>
          {content}
        </div>
      </aside>
    </main>
  );
};
