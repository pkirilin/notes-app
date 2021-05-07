import styled, { ThemeBreakpointKey } from 'styled-components';

type FlexContainerDirection =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse';

export type FlexContainerProps = {
  direction?: FlexContainerDirection;
  spacing?: ThemeBreakpointKey;
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end' | 'baseline' | 'stretch';
  grow?: number;
  growBreakpoints?: Partial<Record<ThemeBreakpointKey, number>>;
  directionBreakpoints?: Partial<
    Record<ThemeBreakpointKey, FlexContainerDirection>
  >;
};

const directionSpacingMap = {
  row: 'margin-left',
  column: 'margin-top',
  'row-reverse': 'margin-right',
  'column-reverse': 'margin-bottom',
};

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  ${({ direction }) => direction && `flex-direction: ${direction};`}
  ${({ justify }) => justify && `justify-content: ${justify};`}
  ${props => props.align && `align-items: ${props.align};`}
  ${({ grow }) => grow && `flex-grow: ${grow};`}

  & > :not(:first-child) {
    ${({ theme, spacing, direction = 'row' }) =>
      spacing && `${directionSpacingMap[direction]}: ${theme.sizing[spacing]};`}
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
