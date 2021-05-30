import React, { useEffect, useState } from 'react';

export default function createValidatedStateHook<S>(
  validate: (value: S) => [boolean, string],
): (
  value: S,
) => [
  S,
  boolean,
  string,
  React.Dispatch<React.SetStateAction<S>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<string>>,
] {
  return initialValue => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    useEffect(() => {
      const [valid, message] = validate(value);
      setError(!valid);
      setValidationMessage(message);
    }, [value, validate]);

    return [value, error, validationMessage, setValue, setError, setValidationMessage];
  };
}
