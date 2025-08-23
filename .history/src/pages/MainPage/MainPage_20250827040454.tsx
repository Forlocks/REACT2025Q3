import React from 'react';
import { Button } from '../../components/Button/Button';
import './MainPage.scss';

export const MainPage: React.FC = () => {
  return (
    <div className="main">
      <h1 className="main__title">Forms</h1>
      <Button onButtonClick={() => {}}></Button>
    </div>
  );
};