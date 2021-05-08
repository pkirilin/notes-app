import styled from 'styled-components';

export const IconButton = styled.button`
  height: fit-content;
  border: ${props => props.theme.borders.default} solid transparent;
  border-radius: ${props => props.theme.sizing.md};
  background-color: transparent;
  transition: ${props => props.theme.transition.default};
  color: ${props => props.theme.text.default};
  padding: ${props => props.theme.sizing.sm};

  &:hover:enabled {
    cursor: pointer;
    background-color: ${props => props.theme.colors.background};
    border-color: ${props => props.theme.colors.backgroundActionDark};
  }

  &:focus:enabled {
    border-color: ${props => props.theme.colors.backgroundActionDark};
  }

  &:disabled {
    cursor: default;
    color: ${props => props.theme.text.hint};
  }
`;
