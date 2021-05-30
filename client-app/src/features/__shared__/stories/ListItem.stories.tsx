import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ListItem } from '../components';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 256px;
`;

export default {
  title: 'shared/ListItem',
  component: ListItem,
  decorators: [story => <Wrapper>{story()}</Wrapper>],
} as Meta;

export const DefaultListItem: Story = () => <ListItem>List item</ListItem>;

export const SelectedListItem: Story = () => <ListItem selected={true}>Selected list item</ListItem>;
