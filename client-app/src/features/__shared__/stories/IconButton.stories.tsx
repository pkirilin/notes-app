import React from 'react';
import { Meta, Story } from '@storybook/react';
import { IconButton } from '../components';
import { Delete } from '@styled-icons/material';

export default {
  title: 'shared/IconButton',
  component: IconButton,
} as Meta;

const Template: Story = args => (
  <IconButton {...args}>
    <Delete size="48"></Delete>
  </IconButton>
);

export const Default = Template.bind({});

Default.args = {
  disabled: false,
};
