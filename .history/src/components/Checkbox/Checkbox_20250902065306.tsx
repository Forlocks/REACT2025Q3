import React from "react";
import './Checkbox.scss';

interface CheckboxProps {
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  children: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({onCheckboxClick, isChecked, children}) => {
  return (
    <div className="checkbox" onClick={}>
      <input
        className="checkbox__field"
        type="checkbox"
        checked={isChecked}
      />
      <div className="checkbox__title">{children}</div>
    </div>
  );
};
