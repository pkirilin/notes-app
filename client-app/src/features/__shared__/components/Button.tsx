import React from 'react';
import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components';

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
  ${props => colorThemes[props.color || 'default']};

  &:disabled {
    cursor: default;
  }
`;

const defaultColorTheme = css`
  background-color: ${props => props.theme.colors.grey.light};
  color: ${props => props.theme.colors.text.default};
  border: ${props =>
    `${props.theme.borders.default} solid ${props.theme.colors.grey.dark}`};

  &:hover:enabled {
    background-color: ${props => props.theme.colors.grey.default};
  }

  &:focus {
    box-shadow: ${props =>
      `0 0 ${props.theme.sizing.md} ${props.theme.colors.grey.dark}`};
  }

  &:disabled {
    color: ${props => props.theme.colors.text.hint};
    border: ${props =>
      `${props.theme.borders.default} solid ${props.theme.colors.grey.default}`};
  }
`;

const primaryColorTheme = css`
  background-color: ${props => props.theme.colors.primary.default};
  color: ${props => props.theme.colors.text.primary};

  &:hover {
    background-color: ${props => props.theme.colors.primary.dark};
  }

  &:focus {
    box-shadow: ${props =>
      `0 0 ${props.theme.sizing.md} ${props.theme.colors.primary.dark}`};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.primary.disabled};
  }
`;

const colorThemes: Record<
  ButtonColor,
  FlattenInterpolation<ThemeProps<DefaultTheme>>
> = {
  default: defaultColorTheme,
  primary: primaryColorTheme,
};
