import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { ModalRegistration } from '../../modals/ModalRegistration/ModalRegistration';
import './MainPage.scss';

export const MainPage: React.FC = () => {
  return (
    <div className={"main"} onClick={() => {}}>
      <h1 className="main__title">CO2 emissions</h1>
      <header className="header">
        <div className="header__control-panel">
          <input className="header__name-field" id="country" name="country" type="text" placeholder="Country" />

          <select className="header__year-field" name="year">
            <option value="value1"></option>
            <option value="value2" selected>Значение 2</option>
            <option value="value3">Значение 3</option>
          </select>

          <div className="header__sort-controller">
            <select className="header__attribute-field" name="sort-attribute">
              <option value="country" selected>Country</option>
              <option value="population">Population</option>
            </select>

            <select className="header__order-field" name="sort-order">
              <option value="ascending" selected>Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>

          <Button onButtonClick={() => {}}>Select columns</Button>
        </div>
      </header>
      <ModalRegistration isOpen={true} onClose={() => {alert('aboba')}}>
        dwa
      </ModalRegistration>
    </div>
  );
};
