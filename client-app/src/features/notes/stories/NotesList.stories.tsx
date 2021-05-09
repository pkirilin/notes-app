import React from 'react';
import { Meta, Story } from '@storybook/react';
import { createStorybookReduxDecorator } from '../../../test-utils';
import {
  draft,
  draftChanged,
  getNotesError,
  getNotesSuccess,
} from '../actions';
import NotesList from '../components/NotesList';
import { STORYBOOK_TEST_NOTE_ITEMS } from './data';

export default {
  title: 'notes/NotesList',
  component: NotesList,
} as Meta;

const Template: Story<unknown> = () => <NotesList></NotesList>;

export const MultipleElements = Template.bind({});

MultipleElements.decorators = [
  createStorybookReduxDecorator([getNotesSuccess(STORYBOOK_TEST_NOTE_ITEMS)]),
];

export const MultipleElementsWithDraftedNote = Template.bind({});

MultipleElementsWithDraftedNote.decorators = [
  createStorybookReduxDecorator([
    getNotesSuccess(STORYBOOK_TEST_NOTE_ITEMS),
    draft(),
    draftChanged('Some draft note'),
  ]),
];

export const SingleElement = Template.bind({});

SingleElement.decorators = [
  createStorybookReduxDecorator([
    getNotesSuccess(STORYBOOK_TEST_NOTE_ITEMS.slice(0, 1)),
  ]),
];

export const Empty = Template.bind({});

Empty.decorators = [createStorybookReduxDecorator([getNotesSuccess([])])];

export const Error = Template.bind({});

Error.decorators = [createStorybookReduxDecorator([getNotesError()])];
