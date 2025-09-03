import React from "react";
import './Checkbox.scss';

interface CheckboxProps {
  isChecked?: boolean;
  children: React.ReactNode;
  onCheckboxClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Checkbox: React.FC<CheckboxProps> = ({onCheckboxClick, isChecked, id, children}) => {
  return (
    <div className="checkbox" onClick={onCheckboxClick}>
      <input
        className="checkbox__field"
        type="checkbox"
        checked={isChecked}
      />
      <div className="checkbox__title">{children}</div>
    </div>
  );
};
