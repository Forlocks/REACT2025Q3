import React from "react";
import './Checkbox.scss';

interface CheckboxProps {
  onCheck: (event: React.MouseEvent) => void;
  isChecked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({onCheck, isChecked}) => {
  return (
    <input className="checkbox" type="checkbox" checked={isChecked} onChange={onCheck}/>
  );
};
