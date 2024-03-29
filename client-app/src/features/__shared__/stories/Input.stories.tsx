import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Input, InputProps } from '../components';
import styled from 'styled-components';
import { Close } from '@styled-icons/material';

export default {
  title: 'shared/Input',
  component: Input,
} as Meta;

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;

  & > :not(:first-child) {
    margin-top: 16px;
  }
`;

export const Examples: Story = () => (
  <Wrapper>
    <Input placeholder="Placeholder"></Input>
    <Input value="Some text"></Input>
    <Input value="Disabled" disabled></Input>
  </Wrapper>
);

const Template: Story<InputProps> = args => <Input {...args}></Input>;

export const Default = Template.bind({});

Default.args = {
  value: '',
  placeholder: 'Some input',
  disabled: false,
};

export const WithIcon = Template.bind({});

WithIcon.args = {
  value: '',
  placeholder: 'Some input',
  disabled: false,
  // eslint-disable-next-line react/display-name
  endIcon: () => <Close size="16"></Close>,
};
