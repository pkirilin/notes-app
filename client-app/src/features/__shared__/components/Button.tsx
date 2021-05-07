import React from 'react';
import styled, { css } from 'styled-components';

type ButtonColor = 'default' | 'primary';

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  color?: ButtonColor;
  fullWidth?: boolean;
};

export const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: ${props => props.theme.sizing.sm};
  padding: ${props => `${props.theme.sizing.md} ${props.theme.sizing.lg}`};
  cursor: pointer;
  transition: ${props => props.theme.transition.default};

  ${props => props.fullWidth && 'width: 100%'};
  ${props => setColor(props.color)};

  &:disabled {
    cursor: default;
  }
`;

function setColor(color: ButtonColor = 'default') {
  switch (color) {
    case 'default':
      return css`
        background-color: ${props => props.theme.colors.backgroundActionLight};
        color: ${props => props.theme.text.default};
        border: ${props =>
          `${props.theme.borders.default} solid ${props.theme.colors.backgroundActionDark}`};

        &:hover:enabled {
          background-color: ${props => props.theme.colors.backgroundAction};
        }

        &:focus {
          box-shadow: ${props =>
            `0 0 ${props.theme.sizing.md} ${props.theme.colors.backgroundActionDark}`};
        }

        &:disabled {
          color: ${props => props.theme.text.hint};
          border: ${props =>
            `${props.theme.borders.default} solid ${props.theme.colors.backgroundAction}`};
        }
      `;
    case 'primary':
      return css`
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.text.primary};

        &:hover {
          background-color: ${props => props.theme.colors.primaryDark};
        }

        &:focus {
          box-shadow: ${props =>
            `0 0 ${props.theme.sizing.md} ${props.theme.colors.primaryDark}`};
        }

        &:disabled {
          background-color: ${props => props.theme.colors.primaryDisabled};
        }
      `;
    default:
      return css``;
  }
}
