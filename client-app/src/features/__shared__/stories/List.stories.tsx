import React from 'react';
import { Meta, Story } from '@storybook/react';
import styled from 'styled-components';
import { List } from '../components';
import { DefaultListItem, SelectedListItem } from './ListItem.stories';

const Wrapper = styled.div`
  width: 256px;
`;

export default {
  title: 'shared/List',
  component: List,
  decorators: [story => <Wrapper>{story()}</Wrapper>],
} as Meta;

export const ListWithMultipleItems: Story = () => (
  <List>
    <SelectedListItem></SelectedListItem>
    <DefaultListItem></DefaultListItem>
    <DefaultListItem></DefaultListItem>
  </List>
);

export const ListWithSingleItem: Story = () => (
  <List>
    <DefaultListItem></DefaultListItem>
  </List>
);
