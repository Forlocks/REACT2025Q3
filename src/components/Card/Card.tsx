'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, removeCard, selectAllSelectedCards } from '../../slices/selectedCardsSlice';
import { RootState } from '../../store';
import { Checkbox } from '../Checkbox/Checkbox';
import './Card.scss';

export interface CardProps {
  uid: string;
  classId: string | undefined;
  name: string;
  registry: string;
  status: string;
  dateStatus: string;
  shipClass: string;
  owner: string;
  operator: string;
}

export const Card: React.FC<CardProps> = ({
  uid,
  classId,
  name,
  registry,
  status,
  dateStatus,
  shipClass,
  owner,
  operator,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedCards = useSelector((state: RootState) => selectAllSelectedCards(state));
  const t = useTranslations('Card');

  const isSelected = selectedCards.some(card => card.uid === uid);

  const handleClick = () => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    newSearchParams.set('details', classId || 'empty');

    router.push(`?${newSearchParams.toString()}`);
  }

  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (isSelected) {
      dispatch(removeCard(uid));
      return;
    }

    dispatch(addCard({
      uid,
      classId,
      name,
      registry,
      status,
      dateStatus,
      shipClass,
      owner,
      operator,
    }));
  }

  return (
    <div className="card" onClick={handleClick}>
      <div className="card__title">
        <Checkbox onCheckboxClick={handleCheckboxClick} isChecked={isSelected}></Checkbox>
        <div className="card__name">{name}</div>
      </div>
      <ul className="card__description">
        <li className="card__property">
          <span>{t('registry')}</span>
          <span>{registry}</span>
        </li>
        <li className="card__property">
          <span>{t('status')}</span>
          <span>{status}</span>
        </li>
        <li className="card__property">
          <span>{t('dateStatus')}</span>
          <span>{dateStatus}</span>
        </li>
        <li className="card__property">
          <span>{t('shipClass')}</span>
          <span>{shipClass}</span>
        </li>
        <li className="card__property">
          <span>{t('owner')}</span>
          <span>{owner}</span>
        </li>
        <li className="card__property">
          <span>{t('operator')}</span>
          <span>{operator}</span>
        </li>
      </ul>
    </div>
  );
};
