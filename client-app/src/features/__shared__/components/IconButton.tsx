import styled from 'styled-components';

export const IconButton = styled.button`
  height: fit-content;
  border: ${props => props.theme.borders.default} solid transparent;
  background-color: transparent;
  transition: ${props => props.theme.transition.default};
  color: rgba(0, 0, 0, 0.7);

  &:hover {
    color: rgba(0, 0, 0, 1);
    cursor: pointer;
  }

  &:focus {
    border-color: ${props => props.theme.colors.backgroundActionDark};
    border-radius: ${props => props.theme.sizing.md};
  }

  &:disabled {
    color: rgba(0, 0, 0, 0.4);
    cursor: default;
  }
`;
