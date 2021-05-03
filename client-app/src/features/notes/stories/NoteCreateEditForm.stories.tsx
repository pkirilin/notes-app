import React from 'react';
import { Meta, Story } from '@storybook/react';
import NoteCreateEditForm from '../components/NoteCreateEditForm';
import { createStorybookReduxDecorator } from '../../../test-utils';
import { getNotesSuccess } from '../actions';

export default {
  title: 'notes/NoteCreateEditForm',
  component: NoteCreateEditForm,
  decorators: [createStorybookReduxDecorator([getNotesSuccess([])])],
} as Meta;

const Template: Story<unknown> = () => (
  <NoteCreateEditForm></NoteCreateEditForm>
);

export const Default = Template.bind({});
