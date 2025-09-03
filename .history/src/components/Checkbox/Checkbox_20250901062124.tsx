import React from "react";
import './Checkbox.scss';

interface CheckboxProps {
  onCheckboxClick?: (event: React.MouseEvent) => void;
  isChecked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({onCheckboxClick, isChecked}) => {
  return (
    <input className="checkbox" onClick={onCheckboxClick} type="checkbox" checked={isChecked} onChange={() => {}}/>
  );
};
