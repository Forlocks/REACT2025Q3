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

          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Name" />

          <select name="select">
            <option value="value1"></option>
            <option value="value2" selected>Значение 2</option>
            <option value="value3">Значение 3</option>
          </select>

          <div>

          </div>
          <select name="select">
            <option value="value1"></option>
            <option value="value2" selected>Значение 2</option>
            <option value="value3">Значение 3</option>
          </select>

          <select name="select">
            <option value="value1"></option>
            <option value="value2" selected>Значение 2</option>
            <option value="value3">Значение 3</option>
          </select>

          <Button onClick={() => setFormType('registration')}>Select columns</Button>
        </div>
      </header>
      <ModalRegistration isOpen={true} onClose={() => {alert('aboba')}}>
        dwa
      </ModalRegistration>
    </div>
  );
};
