import styled, { DefaultTheme } from 'styled-components';

export type FlexContainerProps = {
  direction?: 'row' | 'column';
  spacing?: keyof DefaultTheme['sizing'];
};

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};

  & > :not(:first-child) {
    margin-left: ${({ direction = 'row', spacing = 'none', theme }) =>
      direction === 'column' ? '0' : theme.sizing[spacing]};

    margin-top: ${({ direction = 'row', spacing = 'none', theme }) =>
      direction === 'row' ? '0' : theme.sizing[spacing]};
  }
`;
