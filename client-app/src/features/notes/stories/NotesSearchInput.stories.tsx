import React from 'react';
import { Meta, Story } from '@storybook/react';
import { createStorybookReduxDecorator } from '../../../test-utils';
import NotesSearchInput from '../components/NotesSearchInput';

export default {
  title: 'notes/NotesSearchInput',
  component: NotesSearchInput,
} as Meta;

export const Search: Story = () => <NotesSearchInput></NotesSearchInput>;

Search.decorators = [createStorybookReduxDecorator()];
