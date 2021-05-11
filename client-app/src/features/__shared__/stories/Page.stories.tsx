import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Page } from '../components';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid black;
`;

export default {
  title: 'shared/Page',
  component: Page,
} as Meta;

export const PageContentWithPadding: Story = () => (
  <Wrapper>
    <Page>Some content</Page>
  </Wrapper>
);
