import styled, { DefaultTheme, ThemeBreakpointKey } from 'styled-components';

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
  growBreakpoints?: Partial<Record<ThemeBreakpointKey, number>>;
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

  @media (min-width: ${props => props.theme.breakpoints.xs}) {
    ${props =>
      props.growBreakpoints?.xs && `flex-grow: ${props.growBreakpoints.xs};`}
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    ${props =>
      props.growBreakpoints?.sm && `flex-grow: ${props.growBreakpoints.sm};`}
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    ${props =>
      props.growBreakpoints?.md && `flex-grow: ${props.growBreakpoints.md};`}
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    ${props =>
      props.growBreakpoints?.lg && `flex-grow: ${props.growBreakpoints.lg};`}
  }

  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    ${props =>
      props.growBreakpoints?.xl && `flex-grow: ${props.growBreakpoints.xl};`}
  }
`;
