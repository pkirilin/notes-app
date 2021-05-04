import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.text.primary};
  border: ${props =>
    `${props.theme.borders.default} solid ${props.theme.colors.primaryDark}`};
  border-radius: ${props => props.theme.sizing['sm']};
  padding: ${props => props.theme.sizing['md']};
  cursor: pointer;
  transition: ${props => props.theme.transition.default};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  &:focus {
    box-shadow: ${props =>
      `0 0 ${props.theme.sizing.sm} ${props.theme.colors.primaryDark}`};
  }
`;
