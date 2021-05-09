import React from 'react';
import { Meta, Story } from '@storybook/react';
import NoteCreateEditForm from '../components/NoteCreateEditForm';
import { createStorybookReduxDecorator } from '../../../test-utils';
import { draft, getNotesSuccess, noteSelected } from '../actions';
import { STORYBOOK_TEST_NOTE_ITEMS } from './data';

export default {
  title: 'notes/NoteCreateEditForm',
  component: NoteCreateEditForm,
} as Meta;

const Template: Story<unknown> = () => (
  <NoteCreateEditForm></NoteCreateEditForm>
);

export const Selected = Template.bind({});

Selected.decorators = [
  createStorybookReduxDecorator([
    getNotesSuccess([]),
    noteSelected(STORYBOOK_TEST_NOTE_ITEMS[0]),
  ]),
];

export const Drafted = Template.bind({});

Drafted.decorators = [
  createStorybookReduxDecorator([getNotesSuccess([]), draft()]),
];

export const NotSelected = Template.bind({});

NotSelected.decorators = [createStorybookReduxDecorator([getNotesSuccess([])])];
