import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FlexContainer, FlexContainerProps } from '../components';
import styled from 'styled-components';

export default {
  title: 'shared/FlexContainer',
  component: FlexContainer,
} as Meta;

const TestBlock = styled.div`
  display: block;
  height: 100px;
  width: 200px;

  &:nth-child(1) {
    background-color: #7860ff;
  }

  &:nth-child(2) {
    background-color: #009218;
  }

  &:nth-child(3) {
    background-color: #e65d0f;
  }
`;

const Template: Story<FlexContainerProps> = args => (
  <FlexContainer {...args}>
    <TestBlock></TestBlock>
    <TestBlock></TestBlock>
    <TestBlock></TestBlock>
  </FlexContainer>
);

export const Default = Template.bind({});

Default.args = {};

export const Direction = Template.bind({});

Direction.args = {
  direction: 'row',
};

export const Spacing = Template.bind({});

Spacing.args = {
  spacing: 'md',
};

export const Justify = Template.bind({});

Justify.args = {
  justify: 'center',
};
