import { InputHTMLAttributes, useState } from 'react';
import { FormHookResultBase } from 'app/types';

export type CheckboxBinding = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'onChange'
>;

export type UseCheckboxHookResult = FormHookResultBase<
  boolean,
  CheckboxBinding
>;

export function useCheckbox(initialValue = false): UseCheckboxHookResult {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    binding: {
      checked: value,
      onChange: () => {
        setValue(!value);
      },
    },
  };
}
