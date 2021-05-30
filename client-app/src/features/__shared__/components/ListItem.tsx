import styled from 'styled-components';

export type ListItemProps = {
  selected?: boolean;
};

export const ListItem = styled.li<ListItemProps>`
  list-style: none;
  padding: ${props => props.theme.sizing.md};
  width: 100%;

  background-color: ${props =>
    props.selected
      ? props.theme.colors.grey.light
      : props.theme.colors.background.default};

  transition: ${props => props.theme.transition.default};

  &:hover {
    background-color: ${props => props.theme.colors.grey.default};
    cursor: pointer;
  }
`;
