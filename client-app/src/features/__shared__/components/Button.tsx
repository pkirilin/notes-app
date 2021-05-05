import React from 'react';
import styled from 'styled-components';

export type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

export const Button = styled.button<ButtonProps>`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.text.primary};
  border: none;
  border-radius: ${props => props.theme.sizing.sm};
  padding: ${props => props.theme.sizing.md};
  cursor: pointer;
  transition: ${props => props.theme.transition.default};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  &:focus {
    box-shadow: ${props =>
      `0 0 ${props.theme.sizing.md} ${props.theme.colors.primaryDark}`};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.primaryDisabled};
    cursor: default;
  }
`;
