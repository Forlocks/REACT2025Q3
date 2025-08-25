import React from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '../Card/Card';
import { Ship } from '../../models/Ship';
import { deleteTags } from '../../controllers/deleteTags/deleteTags';
import './CardsContainer.scss';

interface CardsContainerProps {
  ships: Ship[];
}

export const CardsContainer: React.FC<CardsContainerProps> = ({ ships }) => {
  const t = useTranslations('Card');
  const unknownText = t('unknown');

  const cards = ships.map((ship) => (
    <Card
      key={ship.uid}
      uid={ship.uid}
      classId={ship.spacecraftClass?.uid}
      name={deleteTags(ship.name) || unknownText}
      registry={deleteTags(ship.registry) || unknownText}
      status={deleteTags(ship.status) || unknownText}
      dateStatus={deleteTags(ship.dateStatus) || unknownText}
      shipClass={deleteTags(ship.spacecraftClass?.name) || unknownText}
      owner={deleteTags(ship.owner?.name) || unknownText}
      operator={deleteTags(ship.operator?.name) || unknownText}
    />
  ));

  return <div className="cards-container">{cards}</div>;
};
