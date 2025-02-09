import React from 'react';
import { Card } from '../Card/Card';
import { Ship } from '../../models/Ship';
import { deleteTags } from '../../controllers/deleteTags';
import './CardsContainer.scss';

interface CardsContainerProps {
  ships: Ship[];
}

export const CardsContainer: React.FC<CardsContainerProps> = ({ ships }) => {
  const cards = ships.map((ship) => (
    <Card
      key={ship.uid}
      name={deleteTags(ship.name)}
      registry={deleteTags(ship.registry || 'unknown')}
      status={deleteTags(ship.status || 'unknown')}
      dateStatus={deleteTags(ship.dateStatus || 'unknown')}
      shipClass={deleteTags(ship.class?.name || 'unknown')}
      owner={deleteTags(ship.owner?.name || 'unknown')}
      operator={deleteTags(ship.operator?.name || 'unknown')}
    />
  ));

  return <div className="cards-container">{cards}</div>;
};
