import React from "react";
import './Checkbox.scss';

interface CheckboxProps {
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({onCheckboxChange, isChecked}) => {
  return (
    <div>
      <div className></div>
      <input className="checkbox" type="checkbox" checked={isChecked} onChange={onCheckboxChange}/>
    </div>
  );
};
