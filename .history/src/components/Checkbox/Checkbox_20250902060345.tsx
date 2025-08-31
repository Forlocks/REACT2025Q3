import React from "react";
import './Checkbox.scss';

interface CheckboxProps {
  onCheckboxChange?: (checked: boolean) => void;
  isChecked?: boolean;
  children: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({ onCheckboxChange, isChecked = false, children }) => {
  const handleClick = () => {
    onCheckboxChange?.(!isChecked);
  };

  return (
    <div className="checkbox" onClick={handleClick}>
      <input
        className="checkbox__field"
        type="checkbox"
        checked={isChecked}
        readOnly
      />
      <div className="checkbox__title">{children}</div>
    </div>
  );
};
