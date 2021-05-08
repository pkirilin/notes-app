import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from '../components';
import styled from 'styled-components';

export default {
  title: 'shared/Button',
  component: Button,
} as Meta;

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;

  & > :not(:first-child) {
    margin-top: 16px;
  }
`;

const Template: Story<ButtonProps> = args => <Button {...args}>Button</Button>;

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  color: 'default',
};

export const Variants: Story = () => (
  <Wrapper>
    <Button>Default</Button>
    <Button disabled>Default disabled</Button>
    <Button color="primary">Primary</Button>
    <Button color="primary" disabled>
      Primary disabled
    </Button>
  </Wrapper>
);

export const FullWidth = Template.bind({});

FullWidth.args = {
  fullWidth: true,
  disabled: false,
};
