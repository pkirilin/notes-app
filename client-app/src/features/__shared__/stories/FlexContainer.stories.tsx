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

const NestedFlexContainer = styled(FlexContainer)`
  height: 100px;
  border: 1px solid black;
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

export const NestedItemsWidth: Story = () => (
  <FlexContainer>
    <NestedFlexContainer grow={1}>item 1</NestedFlexContainer>
    <NestedFlexContainer grow={2}>item 2</NestedFlexContainer>
    <NestedFlexContainer grow={3}>item 3</NestedFlexContainer>
  </FlexContainer>
);

export const ResponsiveLayout: Story = () => (
  <FlexContainer directionBreakpoints={{ xs: 'column', sm: 'row' }}>
    <NestedFlexContainer growBreakpoints={{ xs: 1, md: 2 }}>
      item 1
    </NestedFlexContainer>
    <NestedFlexContainer growBreakpoints={{ xs: 1, md: 1, lg: 4 }}>
      item 2
    </NestedFlexContainer>
    <NestedFlexContainer growBreakpoints={{ xs: 1, md: 2 }}>
      item 3
    </NestedFlexContainer>
  </FlexContainer>
);
