import React from 'react';
import { Meta, Story } from '@storybook/react';
import { RegisterInput } from '../components';
import { createStorybookReduxDecorator } from '../../../test-utils';

export default {
  title: 'auth/RegisterInput',
  component: RegisterInput,
  decorators: [createStorybookReduxDecorator()],
} as Meta;

export const Default: Story = () => <RegisterInput></RegisterInput>;
