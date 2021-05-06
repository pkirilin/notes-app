import React from 'react';
import styled from 'styled-components';

export type TypographyProps = {
  type?: 'title' | 'subtitle' | 'body1' | 'body2' | 'caption';
};

const Title = styled.h1`
  font-size: 34px;
  font-weight: normal;
  letter-spacing: 0.25px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: normal;
  letter-spacing: 0px;
`;

const Body1 = styled.p`
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 0.5px;
`;

const Body2 = styled.p`
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0.25px;
`;

const Caption = styled.p`
  font-size: 12px;
  font-weight: normal;
  letter-spacing: 0.4px;
`;

type TypographyComponentTypes =
  | typeof Title
  | typeof Subtitle
  | typeof Body1
  | typeof Body2
  | typeof Caption;

const typeMappings: Record<
  NonNullable<TypographyProps['type']>,
  TypographyComponentTypes
> = {
  title: Title,
  subtitle: Subtitle,
  body1: Body1,
  body2: Body2,
  caption: Caption,
};

export const Typography: React.FC<TypographyProps> = ({
  type = 'body1',
  children,
}: React.PropsWithChildren<TypographyProps>) => {
  const Component = typeMappings[type];
  return <Component>{children}</Component>;
};
