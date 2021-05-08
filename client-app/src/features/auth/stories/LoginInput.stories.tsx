import React from 'react';
import { Meta, Story } from '@storybook/react';
import { LoginInput } from '../components';
import { createStorybookReduxDecorator } from '../../../test-utils';

export default {
  title: 'auth/LoginInput',
  component: LoginInput,
  decorators: [createStorybookReduxDecorator()],
} as Meta;

export const Default: Story = () => <LoginInput></LoginInput>;
