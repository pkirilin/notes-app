import React from 'react';

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  label = '',
  checked = false,
  onChange = () => {
    return;
  },
  ...inputProps
}: CheckBoxProps) => {
  return (
    <label>
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...inputProps}
      />
    </label>
  );
};
