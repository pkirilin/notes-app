import styled, { DefaultTheme } from 'styled-components';

export type FlexContainerProps = {
  direction?: 'row' | 'column';
  spacing?: keyof DefaultTheme['sizing'];
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
};

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  justify-content: ${({ justify = 'flex-start' }) => justify};

  & > :not(:first-child) {
    margin-left: ${({ direction = 'row', spacing = 'none', theme }) =>
      direction === 'column' ? '0' : theme.sizing[spacing]};

    margin-top: ${({ direction = 'row', spacing = 'none', theme }) =>
      direction === 'row' ? '0' : theme.sizing[spacing]};
  }
`;
