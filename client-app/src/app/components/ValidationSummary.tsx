import { UseInputHookResult } from '../../app/hooks';
import React from 'react';

export type ValidationSummaryDetail = Pick<
  UseInputHookResult<unknown>,
  'isValid' | 'validationMessage'
>;

export type ValidationSummaryProps = {
  isVisible: boolean;
  details: ValidationSummaryDetail[];
};

export const ValidationSummary: React.FC<ValidationSummaryProps> = ({
  isVisible,
  details,
}: ValidationSummaryProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <ul>
      {details
        .filter(d => d.validationMessage)
        .map(({ validationMessage }, i) => (
          <li key={i}>{validationMessage}</li>
        ))}
    </ul>
  );
};
