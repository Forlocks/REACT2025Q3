import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { ModalRegistration } from '../../modals/ModalRegistration/ModalRegistration';
import './MainPage.scss';

export const MainPage: React.FC = () => {
  return (
    <div className={formType ? "main main--blurred" : "main"} onClick={() => formType && setFormType(null)}>
      <header className="header">
        <h1 className="header__title">CO2 emissions</h1>
        <div className="header__control-panel">
          <input className="header__name-field" id="country" name="country" type="text" placeholder="Country" />

          <select className="header__name-field" name="year">
            <option value="value1"></option>
            <option value="value2" selected>Значение 2</option>
            <option value="value3">Значение 3</option>
          </select>

          <div>
            <select name="sort-attribute">
              <option value="value1">Country</option>
              <option value="value2" selected>Population</option>
            </select>

            <select name="sort-order">
              <option value="value1">Ascending</option>
              <option value="value2" selected>Descending</option>
            </select>
          </div>

          <Button onClick={() => setFormType('registration')}>Select columns</Button>
        </div>
      </header>
      <ModalRegistration isOpen={true} onClose={() => {alert('aboba')}}>
        dwa
      </ModalRegistration>
    </div>
  );
};
