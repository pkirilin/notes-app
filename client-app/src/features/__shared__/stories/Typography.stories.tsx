import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Typography } from '../components';
import styled from 'styled-components';

export default {
  title: 'shared/Typography',
  component: Typography,
} as Meta;

const Wrapper = styled.div`
  & > :not(:first-child) {
    margin-top: ${props => props.theme.sizing.lg};
  }
`;

export const TypographyVariants: Story = () => (
  <Wrapper>
    <Typography type="title">Title</Typography>
    <Typography type="subtitle">Subtitle</Typography>
    <Typography type="body1">Body 1</Typography>
    <Typography type="body2">Body 2</Typography>
    <Typography type="caption">Caption</Typography>
  </Wrapper>
);

export const DefaultTypography: Story = () => (
  <Typography>Default variant</Typography>
);
