import React from 'react';
import styled from 'styled-components';

const ValidationSummaryList = styled.ul`
  color: ${props => props.theme.colors.error};
  padding: ${props => props.theme.sizing.md} ${props => props.theme.sizing.xl};
  border: ${props => props.theme.borders.default} solid
    ${props => props.theme.colors.error};
  border-radius: ${props => props.theme.sizing.md};
`;

const ValidationSummaryListItem = styled.li`
  padding: ${props => props.theme.sizing.sm};
`;

export type ValidationSummaryDetail = {
  isValid: boolean;
  validationMessage?: string;
};

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
    <ValidationSummaryList>
      {details
        .filter(d => d.validationMessage)
        .map(({ validationMessage }, i) => (
          <ValidationSummaryListItem key={i}>
            {validationMessage}
          </ValidationSummaryListItem>
        ))}
    </ValidationSummaryList>
  );
};
