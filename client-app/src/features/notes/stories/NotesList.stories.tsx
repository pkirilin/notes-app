import React from 'react';
import { Meta, Story } from '@storybook/react';
import { createStorybookReduxDecorator } from '../../../test-utils';
import { getNotesSuccess } from '../actions';
import NotesList from '../components/NotesList';

export default {
  title: 'notes/NotesList',
  component: NotesList,
} as Meta;

const Template: Story<unknown> = () => <NotesList></NotesList>;

export const Empty = Template.bind({});

Empty.decorators = [createStorybookReduxDecorator([getNotesSuccess([])])];

export const WithElements = Template.bind({});

WithElements.decorators = [
  createStorybookReduxDecorator([
    getNotesSuccess([
      {
        id: 1,
        text: 'Note 1',
        createdAt: '2021-05-01',
        updatedAt: '2021-05-01',
      },
      {
        id: 2,
        text: 'Note 2',
        createdAt: '2021-05-02',
        updatedAt: '2021-05-02',
      },
      {
        id: 3,
        text: 'Note 3',
        createdAt: '2021-05-03',
        updatedAt: '2021-05-03',
      },
    ]),
  ]),
];
