import { InputHTMLAttributes, useEffect, useState } from 'react';

export interface UseInputHookResult<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  isValid: boolean;
  binding: InputParameters;
}

type InputParameters = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;
export type UseInputHookValue = InputParameters['value'];
export type UseInputHookValidator<T> = (value: T) => boolean;

export function useInput<T extends UseInputHookValue>(
  initialValue: T,
  validator?: UseInputHookValidator<T>,
): UseInputHookResult<T> {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(validator ? false : true);

  useEffect(() => {
    if (validator) {
      setIsValid(validator(value));
    }
  }, [validator, value]);

  return {
    value,
    setValue,
    isValid,
    binding: {
      value,
      onChange: (event): void => {
        setValue(event.target.value as T);
      },
    },
  };
}
