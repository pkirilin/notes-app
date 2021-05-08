import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Typography, TypographyProps } from '../components';
import styled from 'styled-components';

export default {
  title: 'shared/Typography',
  component: Typography,
} as Meta;

export const Default: Story<TypographyProps> = args => (
  <Typography {...args}>Some text</Typography>
);

Default.args = {
  type: 'body1',
  align: 'left',
  color: undefined,
};

Default.argTypes = {
  color: {
    control: {
      type: 'radio',
      options: [undefined, 'default', 'hint'],
    },
  },
  type: {
    control: {
      type: 'radio',
      options: ['title', 'subtitle', 'body1', 'body2', 'caption'],
    },
  },
  align: {
    control: {
      type: 'radio',
      options: ['left', 'center', 'right'],
    },
  },
};

const Wrapper = styled.div`
  & > :not(:first-child) {
    margin-top: ${props => props.theme.sizing.lg};
  }
`;

export const Variants: Story = () => (
  <Wrapper>
    <Typography type="title">Title</Typography>
    <Typography type="subtitle">Subtitle</Typography>
    <Typography type="body1">Body 1</Typography>
    <Typography type="body2">Body 2</Typography>
    <Typography type="caption">Caption</Typography>
  </Wrapper>
);

export const Colors: Story = () => (
  <Wrapper>
    <Typography>Unset</Typography>
    <Typography color="default">Default</Typography>
    <Typography color="hint">Hint</Typography>
  </Wrapper>
);

export const Alignment: Story = () => (
  <Wrapper>
    <Typography align="left">Left</Typography>
    <Typography align="center">Center</Typography>
    <Typography align="right">Right</Typography>
  </Wrapper>
);
