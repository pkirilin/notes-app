import React from 'react';
import { Meta, Story } from '@storybook/react';
import { NotesPage } from '../components';
import { loginSuccess } from '../../auth/actions';
import { createStorybookReduxDecorator } from '../../../test-utils';
import { getNotesRequest, getNotesSuccess } from '../actions';
import { STORYBOOK_TEST_NOTE_ITEMS, STORYBOOK_TEST_USER } from './data';

export default {
  title: 'notes/NotesPage',
  component: NotesPage,
} as Meta;

export const AuthenticatedUserWithNotesCollection: Story = () => (
  <NotesPage></NotesPage>
);

AuthenticatedUserWithNotesCollection.decorators = [
  createStorybookReduxDecorator([
    loginSuccess(STORYBOOK_TEST_USER),
    getNotesSuccess(STORYBOOK_TEST_NOTE_ITEMS),
  ]),
];

export const AuthenticatedUserWithNotesCollectionLoading: Story = () => (
  <NotesPage></NotesPage>
);

AuthenticatedUserWithNotesCollectionLoading.decorators = [
  createStorybookReduxDecorator([
    loginSuccess(STORYBOOK_TEST_USER),
    getNotesRequest(),
  ]),
];
