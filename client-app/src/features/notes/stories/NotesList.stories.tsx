import React from 'react';
import { Meta, Story } from '@storybook/react';
import { createStorybookReduxDecorator } from '../../../test-utils';
import {
  draft,
  draftChanged,
  getNotesError,
  getNotesRequest,
  getNotesSuccess,
} from '../actions';
import NotesList from '../components/NotesList';
import {
  STORYBOOK_TEST_NOTE_ITEMS,
  STORYBOOK_TEST_NOTE_ITEMS_MANY,
} from './data';

export default {
  title: 'notes/NotesList',
  component: NotesList,
} as Meta;

const Template: Story<unknown> = () => <NotesList></NotesList>;

export const MultipleNotes = Template.bind({});

MultipleNotes.decorators = [
  createStorybookReduxDecorator([getNotesSuccess(STORYBOOK_TEST_NOTE_ITEMS)]),
];

export const DraftedNote = Template.bind({});

DraftedNote.decorators = [
  createStorybookReduxDecorator([
    getNotesSuccess(STORYBOOK_TEST_NOTE_ITEMS),
    draft(),
    draftChanged('Some draft note'),
  ]),
];

export const ShowMore = Template.bind({});

ShowMore.decorators = [
  createStorybookReduxDecorator([
    getNotesSuccess(STORYBOOK_TEST_NOTE_ITEMS_MANY),
  ]),
];

export const SingleNote = Template.bind({});

SingleNote.decorators = [
  createStorybookReduxDecorator([
    getNotesSuccess(STORYBOOK_TEST_NOTE_ITEMS.slice(0, 1)),
  ]),
];

export const LoadingNotes = Template.bind({});

LoadingNotes.decorators = [createStorybookReduxDecorator([getNotesRequest()])];

export const Empty = Template.bind({});

Empty.decorators = [createStorybookReduxDecorator([getNotesSuccess([])])];

export const Error = Template.bind({});

Error.decorators = [createStorybookReduxDecorator([getNotesError()])];
