import React from "react";
import './Checkbox.scss';

interface CheckboxProps {
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  children: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({onCheckboxChange, isChecked, children}) => {
  return (
    <div className="checkbox" onClick={() => {is}}>
      <input className="checkbox__field" type="checkbox" checked={isChecked} onChange={onCheckboxChange}/>
      <div className="checkbox__title">{children}</div>
    </div>
  );
};
