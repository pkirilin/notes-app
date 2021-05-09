import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';

export type TypographyProps = {
  type?: 'title' | 'subtitle' | 'body1' | 'body2' | 'caption' | 'overline';
  align?: 'left' | 'center' | 'right';
  color?: keyof DefaultTheme['text'];
};

function useBaseStyles({ align, color }: TypographyProps) {
  return css`
    ${align && `text-align: ${align}`};
    ${props => color && `color: ${props.theme.text[color]}`};
  `;
}

const Title = styled.h1<TypographyProps>`
  font-size: 34px;
  font-weight: normal;
  letter-spacing: 0.25px;

  ${props => useBaseStyles(props)};
`;

const Subtitle = styled.h2<TypographyProps>`
  font-size: 24px;
  font-weight: normal;
  letter-spacing: 0px;

  ${props => useBaseStyles(props)};
`;

const Body1 = styled.p<TypographyProps>`
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 0.5px;

  ${props => useBaseStyles(props)};
`;

const Body2 = styled.p<TypographyProps>`
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0.25px;

  ${props => useBaseStyles(props)};
`;

const Caption = styled.p<TypographyProps>`
  font-size: 12px;
  font-weight: normal;
  letter-spacing: 0.4px;

  ${props => useBaseStyles(props)};
`;

const Overline = styled.p<TypographyProps>`
  font-size: 10px;
  font-weight: normal;
  letter-spacing: 1.5px;
  text-transform: uppercase;

  ${props => useBaseStyles(props)};
`;

type TypographyComponentTypes =
  | typeof Title
  | typeof Subtitle
  | typeof Body1
  | typeof Body2
  | typeof Caption
  | typeof Overline;

const typeMappings: Record<
  NonNullable<TypographyProps['type']>,
  TypographyComponentTypes
> = {
  title: Title,
  subtitle: Subtitle,
  body1: Body1,
  body2: Body2,
  caption: Caption,
  overline: Overline,
};

export const Typography: React.FC<TypographyProps> = ({
  type = 'body1',
  children,
  ...props
}: React.PropsWithChildren<TypographyProps>) => {
  const Component = typeMappings[type];
  return <Component {...props}>{children}</Component>;
};
