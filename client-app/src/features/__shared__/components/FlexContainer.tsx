import styled, { DefaultTheme, ThemeBreakpointKey } from 'styled-components';

type FlexContainerDirection = 'row' | 'column';

export type FlexContainerProps = {
  direction?: FlexContainerDirection;
  spacing?: keyof DefaultTheme['sizing'];
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  grow?: number;
  growBreakpoints?: Partial<Record<ThemeBreakpointKey, number>>;
  directionBreakpoints?: Partial<
    Record<ThemeBreakpointKey, FlexContainerDirection>
  >;
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
      props.directionBreakpoints?.xs &&
      `flex-direction: ${props.directionBreakpoints.xs};`}

    ${props =>
      props.growBreakpoints?.xs && `flex-grow: ${props.growBreakpoints.xs};`}
  }

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    ${props =>
      props.directionBreakpoints?.sm &&
      `flex-direction: ${props.directionBreakpoints.sm};`}

    ${props =>
      props.growBreakpoints?.sm && `flex-grow: ${props.growBreakpoints.sm};`}
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    ${props =>
      props.directionBreakpoints?.md &&
      `flex-direction: ${props.directionBreakpoints.md};`}

    ${props =>
      props.growBreakpoints?.md && `flex-grow: ${props.growBreakpoints.md};`}
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    ${props =>
      props.directionBreakpoints?.lg &&
      `flex-direction: ${props.directionBreakpoints.lg};`}

    ${props =>
      props.growBreakpoints?.lg && `flex-grow: ${props.growBreakpoints.lg};`}
  }

  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    ${props =>
      props.directionBreakpoints?.xl &&
      `flex-direction: ${props.directionBreakpoints.xl};`}

    ${props =>
      props.growBreakpoints?.xl && `flex-grow: ${props.growBreakpoints.xl};`}
  }
`;
