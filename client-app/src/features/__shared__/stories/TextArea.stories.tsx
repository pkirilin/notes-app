import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TextArea, TextAreaProps } from '../components';

export default {
  title: 'shared/TextArea',
  component: TextArea,
} as Meta;

const Template: Story<TextAreaProps> = args => <TextArea {...args}></TextArea>;

export const Default = Template.bind({});

Default.args = {
  placeholder: 'Some text area',
  disabled: false,
  rows: 4,
  cols: 50,
};
