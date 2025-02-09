import React from 'react';
import './Card.scss';

interface CardProps {
  name: string;
  registry: string;
  status: string;
  dateStatus: string;
  shipClass: string;
  owner: string;
  operator: string;
}

export const Card: React.FC<CardProps> = ({
  name,
  registry,
  status,
  dateStatus,
  shipClass,
  owner,
  operator,
}) => {
  return (
    <div className="card">
      <div className="card__name">{name}</div>
      <div className="card__description">
        <div className="card__property">
          <span>Registry:</span>
          <span>{registry}</span>
        </div>
        <div className="card__property">
          <span>Status:</span>
          <span>{status}</span>
        </div>
        <div className="card__property">
          <span>Date status:</span>
          <span>{dateStatus}</span>
        </div>
        <div className="card__property">
          <span>Class:</span>
          <span>{shipClass}</span>
        </div>
        <div className="card__property">
          <span>Owner:</span>
          <span>{owner}</span>
        </div>
        <div className="card__property">
          <span>Operator:</span>
          <span>{operator}</span>
        </div>
      </div>
    </div>
  );
};
