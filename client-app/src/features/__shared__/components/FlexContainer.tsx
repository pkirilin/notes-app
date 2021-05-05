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
  grow?: number;
};

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  ${({ direction }) => direction && `flex-direction: ${direction};`}
  ${({ justify }) => justify && `justify-content: ${justify};`}
  ${({ grow }) => grow && `flex-grow: ${grow};`}

  & > :not(:first-child) {
    ${({ theme, spacing, direction = 'row' }) =>
      spacing &&
      `${direction === 'row' ? 'margin-left' : 'margin-top'}: ${
        theme.sizing[spacing]
      };`}
  }
`;
