import React from 'react';
import { Meta, Story } from '@storybook/react';
import { createStorybookReduxDecorator } from '../../../test-utils';
import DraftedNoteItem from '../components/DraftedNoteItem';
import { draft, draftChanged } from '../actions';

export default {
  title: 'notes/DraftedNoteItem',
  component: DraftedNoteItem,
} as Meta;

const Template: Story<unknown> = () => <DraftedNoteItem></DraftedNoteItem>;

export const Visible = Template.bind({});

Visible.decorators = [
  createStorybookReduxDecorator([draft(), draftChanged('This is draft note')]),
];

export const EmptyText = Template.bind({});

EmptyText.decorators = [createStorybookReduxDecorator([draft()])];
