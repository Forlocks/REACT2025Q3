import React from "react";
import './Checkbox.scss';

interface CheckboxProps {
  isChecked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({onCheckboxClick, isChecked}) => {
  return (
    <input className="checkbox" type="checkbox" onChange={onCheckboxClick}/>
  );
};
