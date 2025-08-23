import React from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const selectedCards = useSelector((state: RootState) => selectAllSelectedCards(state));
  const isSelected = selectedCards.some(card => card.uid === uid);

  const handleClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('details', classId || 'empty');
    setSearchParams(newSearchParams);
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
          <span>Registry:</span>
          <span>{registry}</span>
        </li>
        <li className="card__property">
          <span>Status:</span>
          <span>{status}</span>
        </li>
        <li className="card__property">
          <span>Date status:</span>
          <span>{dateStatus}</span>
        </li>
        <li className="card__property">
          <span>Class:</span>
          <span>{shipClass}</span>
        </li>
        <li className="card__property">
          <span>Owner:</span>
          <span>{owner}</span>
        </li>
        <li className="card__property">
          <span>Operator:</span>
          <span>{operator}</span>
        </li>
      </ul>
    </div>
  );
};
