import styled, {
  css,
  DefaultTheme,
  ThemeBreakpointKey,
} from 'styled-components';

type FlexContainerDirection =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse';

type FlexContainerJustify =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around';

type FlexContainerAlign =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'baseline'
  | 'stretch';

type FlexContainerPropWithBreakpoints<T> = Partial<
  Record<ThemeBreakpointKey, T>
>;

export type FlexContainerProps = {
  direction?: FlexContainerDirection;
  directionBreakpoints?: FlexContainerPropWithBreakpoints<FlexContainerDirection>;
  spacing?: ThemeBreakpointKey;
  justify?: FlexContainerJustify;
  justifyBreakpoints?: FlexContainerPropWithBreakpoints<FlexContainerJustify>;
  align?: FlexContainerAlign;
  alignBreakpoints?: FlexContainerPropWithBreakpoints<FlexContainerAlign>;
  grow?: number;
  growBreakpoints?: Partial<Record<ThemeBreakpointKey, number>>;
};

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  ${({ direction }) => direction && `flex-direction: ${direction};`}
  ${({ justify }) => justify && `justify-content: ${justify};`}
  ${props => props.align && `align-items: ${props.align};`}
  ${({ grow }) => grow && `flex-grow: ${grow};`}

  & > :not(:first-child) {
    ${({ theme, spacing, direction = 'row' }) =>
      spacing && `margin: ${getSpacingMargin(theme, spacing, direction)}`};
  }

  ${props => useBreakpoint('xs', props)};
  ${props => useBreakpoint('sm', props)};
  ${props => useBreakpoint('md', props)};
  ${props => useBreakpoint('lg', props)};
  ${props => useBreakpoint('xl', props)};
`;

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

function useBreakpoint(
  breakpoint: ThemeBreakpointKey,
  {
    directionBreakpoints,
    growBreakpoints,
    justifyBreakpoints,
    alignBreakpoints,
    spacing,
  }: FlexContainerProps,
) {
  return css`
    @media (min-width: ${props => props.theme.breakpoints[breakpoint]}) {
      ${directionBreakpoints &&
      directionBreakpoints[breakpoint] &&
      `flex-direction: ${directionBreakpoints[breakpoint]};`}

      ${growBreakpoints &&
      growBreakpoints[breakpoint] &&
      `flex-grow: ${growBreakpoints[breakpoint]};`}

      ${justifyBreakpoints &&
      justifyBreakpoints[breakpoint] &&
      `justify-content: ${justifyBreakpoints[breakpoint]}`};

      ${alignBreakpoints &&
      alignBreakpoints[breakpoint] &&
      `align-items: ${alignBreakpoints[breakpoint]}`};

      & > :not(:first-child) {
        ${props =>
          spacing &&
          directionBreakpoints &&
          directionBreakpoints[breakpoint] &&
          `margin: ${getSpacingMargin(
            props.theme,
            spacing,
            directionBreakpoints[breakpoint],
          )};`}
      }
    }
  `;
}
