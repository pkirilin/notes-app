import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FlexContainer, FlexContainerProps } from '../components';
import styled from 'styled-components';

export default {
  title: 'shared/FlexContainer',
  component: FlexContainer,
} as Meta;

const NestedFlexContainer = styled(FlexContainer)`
  height: 100px;
  border: 1px solid black;
`;

const Template: Story<FlexContainerProps> = args => (
  <FlexContainer {...args}>
    <NestedFlexContainer>item 1</NestedFlexContainer>
    <NestedFlexContainer>item 2</NestedFlexContainer>
    <NestedFlexContainer>item 3</NestedFlexContainer>
  </FlexContainer>
);

export const Row = Template.bind({});

Row.args = {
  direction: 'row',
  spacing: 'md',
  justify: 'center',
};

export const RowReverse = Template.bind({});

RowReverse.args = {
  direction: 'row-reverse',
  spacing: 'md',
  justify: 'center',
};

export const Column = Template.bind({});

Column.args = {
  direction: 'column',
  spacing: 'md',
  align: 'center',
};

export const ColumnReverse = Template.bind({});

ColumnReverse.args = {
  direction: 'column-reverse',
  spacing: 'md',
  align: 'center',
};

export const NestedItemsWidth: Story = () => (
  <FlexContainer>
    <NestedFlexContainer grow={1}>item 1</NestedFlexContainer>
    <NestedFlexContainer grow={2}>item 2</NestedFlexContainer>
    <NestedFlexContainer grow={3}>item 3</NestedFlexContainer>
  </FlexContainer>
);

export const ResponsiveLayout: Story = () => (
  <FlexContainer
    directionBreakpoints={{ xs: 'column', sm: 'row' }}
    spacing="md"
  >
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

export const ResponsiveAlignment: Story = () => (
  <FlexContainer
    directionBreakpoints={{ xs: 'column', sm: 'row' }}
    justifyBreakpoints={{ xs: 'center', sm: 'flex-end' }}
    alignBreakpoints={{ xs: 'center', sm: 'center' }}
  >
    <NestedFlexContainer>item 1</NestedFlexContainer>
    <NestedFlexContainer>item 2</NestedFlexContainer>
  </FlexContainer>
);
