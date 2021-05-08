import styled, { css } from 'styled-components';

export const inputBaseStyles = css`
  padding: ${props => props.theme.sizing.md};
  background-color: transparent;
  color: inherit;
  border: ${props =>
    `${props.theme.borders.default} solid ${props.theme.colors.backgroundActionDark}`};
  border-radius: ${props => props.theme.sizing.sm};
  outline: none;
  transition: ${props => props.theme.transition.default};

  &:focus {
    box-shadow: ${props =>
      `0 0 ${props.theme.sizing.md} ${props.theme.colors.backgroundActionDark}`};
  }

  &:disabled {
    color: ${props => props.theme.text.default};
    border: ${props =>
      `${props.theme.borders.default} solid ${props.theme.colors.backgroundAction}`};
  }

  &::placeholder {
    color: ${props => props.theme.text.hint};
  }
`;

export type InputProps = React.ComponentPropsWithoutRef<'input'>;

export const Input = styled.input`
  ${inputBaseStyles};
`;
