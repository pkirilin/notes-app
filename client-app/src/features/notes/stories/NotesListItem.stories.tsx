import React from 'react';
import { Meta, Story } from '@storybook/react';
import NotesListItem, { NotesListItemProps } from '../components/NotesListItem';
import { createStorybookReduxDecorator } from '../../../test-utils';
import { STORYBOOK_TEST_NOTE_ITEMS } from './data';

export default {
  title: 'notes/NotesListItem',
  component: NotesListItem,
  decorators: [createStorybookReduxDecorator()],
} as Meta;

const Template: Story<NotesListItemProps> = args => (
  <NotesListItem {...args}></NotesListItem>
);

export const Default = Template.bind({});

Default.args = {
  note: STORYBOOK_TEST_NOTE_ITEMS[0],
};

export const LargeText = Template.bind({});

LargeText.args = {
  note: {
    ...STORYBOOK_TEST_NOTE_ITEMS[0],
    text: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus debitis totam aut obcaecati tempore sed ea veniam ex aperiam nihil, quas commodi dicta, illo consequatur. Cum aut repudiandae excepturi corrupti.
  Eum maiores veniam quas aspernatur nam voluptatum, cupiditate enim, velit minus, fugiat harum est voluptate! Incidunt unde aperiam quas. Nesciunt, quasi necessitatibus expedita minus quis vel delectus non temporibus cum.
  Quaerat, ab? Totam inventore quaerat, exercitationem repudiandae ipsum quia a odit voluptatem iure excepturi voluptas laborum tempora porro qui rerum dignissimos deserunt iusto voluptatum repellendus. Totam, rem asperiores. Fugiat, aperiam?
  Quia repellendus aperiam doloremque corrupti molestiae! Optio sunt ea reiciendis officia dolor nulla, temporibus illo eligendi pariatur quis qui doloremque recusandae magnam! A vitae dolor deserunt assumenda temporibus, molestiae possimus.
  Reiciendis, dicta! Voluptate necessitatibus quibusdam aliquam cupiditate ducimus repudiandae aut corrupti deleniti eveniet maxime dolore culpa quas vero ipsum, non, ea exercitationem? Porro nemo aspernatur a repellat similique. Quaerat, ullam.`,
  },
};
