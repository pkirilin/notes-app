import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from '../components';

export default {
  title: 'shared/Button',
  component: Button,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: Story<unknown> = args => <Button {...args}>Button</Button>;

export const Default = Template.bind({});

Default.args = {};
