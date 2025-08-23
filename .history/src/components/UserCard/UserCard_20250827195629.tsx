import React from 'react';
import './UserCard.scss';

export interface UserCardProps {
  photo: string;
  name: string;
  country: string;
  age: string;
  gender: "Male" | "Female" | "Military helicopter";
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
          <span>Gender:</span>
          <span>{gender}</span>
        </li>
        <li className="card__property">
          <span>Email:</span>
          <span>{email}</span>
        </li>
        <li className="card__property">
          <span>Password:</span>
          <span>{password}</span>
        </li>
      </ul>
    </div>
  );
};
