import { InputHTMLAttributes, useEffect, useState } from 'react';

export interface UseInputHookResult<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  setValidationMessage: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  binding: InputParameters;
  isValid: boolean;
  validationMessage?: string;
}

type InputParameters = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

export type UseInputHookValue = InputParameters['value'];

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
