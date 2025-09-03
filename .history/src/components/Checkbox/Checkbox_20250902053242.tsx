import React from "react";
import './Checkbox.scss';

interface CheckboxProps {
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({chidren, onCheckboxChange, isChecked}) => {
  return (
    <div className="checkbox">
      <div className="checkbox__title">{children}</div>
      <input className="checkbox__field" type="checkbox" checked={isChecked} onChange={onCheckboxChange}/>
    </div>
  );
};
