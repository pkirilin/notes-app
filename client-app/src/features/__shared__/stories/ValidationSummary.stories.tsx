import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  ValidationSummary,
  ValidationSummaryProps,
} from '../../../app/components';

export default {
  title: 'shared/ValidationSummary',
  component: ValidationSummary,
} as Meta;

export const Default: Story<ValidationSummaryProps> = args => (
  <ValidationSummary {...args}></ValidationSummary>
);

Default.args = {
  isVisible: true,
  details: [
    {
      isValid: false,
      validationMessage: 'Some error 1',
    },
    {
      isValid: false,
      validationMessage: 'Some error 2',
    },
  ],
};
