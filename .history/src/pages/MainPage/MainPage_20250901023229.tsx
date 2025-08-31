import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { ModalRegistration } from '../../modals/ModalRegistration/ModalRegistration';
import './MainPage.scss';

export const MainPage: React.FC = () => {
  return (
    <div className={formType ? 'main main--blurred' : 'main'} onClick={() => formType && setFormType(null)}>
      <header className="header">
        <h1 className='header__title'>CO2 emissions</h1>
        <div className=""></div>
      </header>
        <div>
          <input
        </div>
      </header>
      </div>
      <ModalRegistration isOpen={true} onClose={() => {alert('aboba')}}>
        dwa
      </ModalRegistration>
    </div>
  );
};
