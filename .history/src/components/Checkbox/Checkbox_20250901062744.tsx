import React from "react";
import './Checkbox.scss';

interface CheckboxProps {
  onCheckboxChange: (event: React.MouseEvent) => void;
  isChecked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({onCheckboxChange, isChecked}) => {
  return (
    <input className="checkbox" type="checkbox" checked={isChecked} onChange={onCheckboxChange}/>
  );
};
