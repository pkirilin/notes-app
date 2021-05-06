import React from 'react';
import { Meta, Story } from '@storybook/react';
import { List } from '../components';

export default {
  title: 'shared/List',
  component: List,
} as Meta;

const Template: Story = args => <List {...args}>List</List>;

export const Default = Template.bind({});

Default.args = {};
