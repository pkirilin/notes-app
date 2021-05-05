import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from '../components';

export default {
  title: 'shared/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args}>Button</Button>;

export const Default = Template.bind({});

Default.args = {
  disabled: false,
};
