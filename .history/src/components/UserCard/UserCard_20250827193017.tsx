import React from 'react';
import './UserCard.scss';

export interface UserCardProps {
  photo: File[];
  name: string;
  country: string;
  age: string;
  gender: "male" | "female";
  email: string;
  password: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  photo,
  name,
  country,
  age,
  gender,
  email,
  password,
}) => {
  return (
    <div className="card">
      <div className="card__title">
        <div className="card__name">{name}</div>
      </div>
      <ul className="card__description">
        <li className="card__property">
          <span>Country:</span>
          <span>{country}</span>
        </li>
        <li className="card__property">
          <span>Age:</span>
          <span>{age}</span>
        </li>
        <li className="card__property">
          <span>gender:</span>
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
