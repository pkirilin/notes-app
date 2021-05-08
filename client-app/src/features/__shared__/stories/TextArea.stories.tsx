import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TextArea, TextAreaProps } from '../components';
import styled from 'styled-components';

export default {
  title: 'shared/TextArea',
  component: TextArea,
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
    <TextArea placeholder="Placeholder" cols={50}></TextArea>
    <TextArea rows={5}>Some text</TextArea>
    <TextArea disabled>Disabled</TextArea>
  </Wrapper>
);

const Template: Story<TextAreaProps> = args => <TextArea {...args}></TextArea>;

export const Default = Template.bind({});

Default.args = {
  placeholder: 'Some text area',
  disabled: false,
  rows: 4,
  cols: 50,
};
