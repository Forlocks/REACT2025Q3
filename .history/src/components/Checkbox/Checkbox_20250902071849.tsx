import React from "react";
import './Checkbox.scss';

interface CheckboxProps {
  onCheckboxClick?: (id: string) => void;
  isChecked?: boolean;
  id: string;
  children: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({onCheckboxClick, isChecked, children}) => {
  return (
    <div className="checkbox" onClick={() => onCheckboxClick()}>
      <input
        className="checkbox__field"
        type="checkbox"
        checked={isChecked}
      />
      <div className="checkbox__title">{children}</div>
    </div>
  );
};
