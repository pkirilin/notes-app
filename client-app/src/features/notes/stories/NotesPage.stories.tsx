import React from 'react';
import { Meta, Story } from '@storybook/react';
import { NotesPage } from '../components';
import { loginSuccess } from '../../auth/actions';
import { createStorybookReduxDecorator } from '../../../test-utils';

export default {
  title: 'notes/NotesPage',
  component: NotesPage,
  decorators: [
    createStorybookReduxDecorator([
      loginSuccess({
        userId: 1,
        userName: 'storybook',
        token: '',
        tokenExpirationInDays: 1,
      }),
    ]),
  ],
} as Meta;

const Template: Story<unknown> = () => <NotesPage></NotesPage>;

export const Default = Template.bind({});
