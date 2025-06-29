import React from 'react';
import { useSearchParams } from 'react-router';
import './Card.scss';

interface CardProps {
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

  const handleClick = async () => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('details', classId || 'empty');
    setSearchParams(newSearchParams);
  }

  return (
    <div className="card" onClick={handleClick}>
      <div className="card__name">{name}</div>
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
