import React from 'react';
import { Meta, Story } from '@storybook/react';
import NotesListItem, { NotesListItemProps } from '../components/NotesListItem';
import { createStorybookReduxDecorator } from '../../../test-utils';

export default {
  title: 'notes/NotesListItem',
  component: NotesListItem,
  decorators: [createStorybookReduxDecorator()],
} as Meta;

const Template: Story<NotesListItemProps> = args => (
  <NotesListItem {...args}></NotesListItem>
);

export const Default = Template.bind({});

Default.args = {
  note: {
    id: 1,
    text: 'Note',
    createdAt: '2021-05-01',
    updatedAt: '2021-05-01',
  },
};
