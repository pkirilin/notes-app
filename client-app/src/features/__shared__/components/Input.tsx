import React from 'react';
import styled, { css } from 'styled-components';
import { IconButton } from './IconButton';

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
    color: ${props => props.theme.colors.text.default};
    border: ${props =>
      `${props.theme.borders.default} solid ${props.theme.colors.backgroundAction}`};
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.hint};
  }
`;

export type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  endIcon?: () => React.ReactElement;
};

const StyledInput = styled.input<InputProps>`
  ${inputBaseStyles};
`;

// TODO: try to fix, only works now for search input and icon size 16px
const InputContainer = styled.div`
  position: relative;
  display: block;

  & > input {
    width: 100%;
    padding-right: 20px;
  }

  & > button {
    margin-top: ${props => props.theme.sizing.sm};
  }
`;

const InputEndIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  border: none;
  background-color: transparent;

  &:hover,
  &:hover:enabled,
  &:focus,
  &:focus:enabled {
    border: none;
    background-color: transparent;
  }
`;

export const Input: React.FC<InputProps> = ({
  endIcon,
  ...props
}: InputProps) => {
  if (endIcon) {
    return (
      <InputContainer>
        <StyledInput {...props}></StyledInput>
        <InputEndIconButton>{endIcon()}</InputEndIconButton>
      </InputContainer>
    );
  }

  return <StyledInput {...props}></StyledInput>;
};
