import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ListItem } from '../components';

export default {
  title: 'shared/ListItem',
  component: ListItem,
} as Meta;

const Template: Story = args => <ListItem {...args}>ListItem</ListItem>;

export const Default = Template.bind({});

Default.args = {};
