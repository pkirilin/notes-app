import styled, { css, DefaultTheme, ThemeBreakpointKey } from 'styled-components';

type FlexContainerDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

type FlexContainerJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';

type FlexContainerAlign = 'flex-start' | 'center' | 'flex-end' | 'baseline' | 'stretch';

type PropWithBreakpoints<T> = Partial<Record<ThemeBreakpointKey, T>>;

export type FlexContainerProps = {
  direction?: FlexContainerDirection;
  directionBreakpoints?: PropWithBreakpoints<FlexContainerDirection>;
  spacing?: ThemeBreakpointKey;
  justify?: FlexContainerJustify;
  justifyBreakpoints?: PropWithBreakpoints<FlexContainerJustify>;
  align?: FlexContainerAlign;
  alignBreakpoints?: PropWithBreakpoints<FlexContainerAlign>;
  flex?: number;
  flexBreakpoints?: PropWithBreakpoints<number>;
};

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;

  ${props => props.direction && `flex-direction: ${props.direction}`};
  ${props => props.justify && `justify-content: ${props.justify}`};
  ${props => props.align && `align-items: ${props.align}`};
  ${props => props.flex && `flex: ${props.flex}`};

  ${props => useSpacing(props)};

  ${props => useBreakpoint('xs', props)};
  ${props => useBreakpoint('sm', props)};
  ${props => useBreakpoint('md', props)};
  ${props => useBreakpoint('lg', props)};
  ${props => useBreakpoint('xl', props)};
`;

function useBreakpoint(breakpoint: ThemeBreakpointKey, flexProps: FlexContainerProps) {
  const { directionBreakpoints, flexBreakpoints, justifyBreakpoints, alignBreakpoints } = flexProps;

  return css`
    @media (min-width: ${props => props.theme.breakpoints[breakpoint]}) {
      ${useBreakpointsProp(breakpoint, 'flex-direction', directionBreakpoints)};
      ${useBreakpointsProp(breakpoint, 'flex', flexBreakpoints)};
      ${useBreakpointsProp(breakpoint, 'justify-content', justifyBreakpoints)};
      ${useBreakpointsProp(breakpoint, 'align-items', alignBreakpoints)};
      ${useSpacing(flexProps, breakpoint)};
    }
  `;
}

function useBreakpointsProp<TProp>(
  breakpoint: ThemeBreakpointKey,
  cssPropName: string,
  breakpointsProp?: PropWithBreakpoints<TProp>,
) {
  return css`
    ${breakpointsProp && breakpointsProp[breakpoint] && `${cssPropName}: ${breakpointsProp[breakpoint]}`};
  `;
}

function useSpacing(
  { spacing, direction = 'row', directionBreakpoints }: FlexContainerProps,
  breakpoint?: ThemeBreakpointKey,
) {
  if (!breakpoint) {
    return css`
      & > :not(:first-child) {
        ${props => spacing && `margin: ${getSpacingMargin(props.theme, spacing, direction)}`};
      }
    `;
  }

  return css`
    & > :not(:first-child) {
      ${props =>
        spacing &&
        directionBreakpoints &&
        directionBreakpoints[breakpoint] &&
        `margin: ${getSpacingMargin(props.theme, spacing, directionBreakpoints[breakpoint])};`}
    }
  `;
}

function getSpacingMargin(
  theme: DefaultTheme,
  spacing: ThemeBreakpointKey,
  direction?: FlexContainerDirection,
): string {
  const mappings = {
    row: `0 0 0 ${theme.sizing[spacing]}`,
    column: `${theme.sizing[spacing]} 0 0 0`,
    'row-reverse': `0 ${theme.sizing[spacing]} 0 0`,
    'column-reverse': `0 0 ${theme.sizing[spacing]} 0`,
  };

  return direction ? mappings[direction] : '0 0 0 0';
}
