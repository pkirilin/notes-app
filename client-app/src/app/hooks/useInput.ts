import { InputHTMLAttributes, useEffect, useState } from 'react';
import { FormHookResultBase } from '../../features/__shared__/types';

export type InputBinding = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

export interface UseInputHookResult<TValue>
  extends FormHookResultBase<TValue, InputBinding> {
  setValidationMessage: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  isValid: boolean;
  validationMessage?: string;
}

export type UseInputHookValue = InputBinding['value'];

export type UseInputHookValidationResult = {
  isValid: boolean;
  message?: string;
};

export type UseInputHookValidator<T> = (
  value: T,
) => UseInputHookValidationResult;

export function useInput<T extends UseInputHookValue>(
  initialValue: T,
  validator?: UseInputHookValidator<T>,
): UseInputHookResult<T> {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(validator ? false : true);
  const [validationMessage, setValidationMessage] = useState<string>();

  useEffect(() => {
    if (validator) {
      const { isValid, message } = validator(value);
      setIsValid(isValid);
      setValidationMessage(message);
    }
  }, [validator, value]);

  return {
    value,
    setValue,
    setValidationMessage,
    setIsValid,
    isValid,
    validationMessage,
    binding: {
      value,
      onChange: (event): void => {
        setValue(event.target.value as T);
      },
    },
  };
}
