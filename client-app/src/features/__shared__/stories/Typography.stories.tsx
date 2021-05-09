import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Typography, TypographyProps } from '../components';
import styled from 'styled-components';

export default {
  title: 'shared/Typography',
  component: Typography,
} as Meta;

export const Default: Story<TypographyProps> = args => (
  <Typography {...args}>Some text</Typography>
);

Default.args = {
  type: 'body1',
  align: 'left',
  color: undefined,
};

Default.argTypes = {
  color: {
    control: {
      type: 'radio',
      options: [undefined, 'default', 'hint'],
    },
  },
  type: {
    control: {
      type: 'radio',
      options: ['title', 'subtitle', 'body1', 'body2', 'caption'],
    },
  },
  align: {
    control: {
      type: 'radio',
      options: ['left', 'center', 'right'],
    },
  },
};

const Wrapper = styled.div`
  & > :not(:first-child) {
    margin-top: ${props => props.theme.sizing.lg};
  }
`;

export const Variants: Story = () => (
  <Wrapper>
    <Typography type="title">Title</Typography>
    <Typography type="subtitle">Subtitle</Typography>
    <Typography type="body1">Body 1</Typography>
    <Typography type="body2">Body 2</Typography>
    <Typography type="caption">Caption</Typography>
    <Typography type="overline">Overline</Typography>
  </Wrapper>
);

export const Colors: Story = () => (
  <Wrapper>
    <Typography>Unset</Typography>
    <Typography color="default">Default</Typography>
    <Typography color="hint">Hint</Typography>
  </Wrapper>
);

export const Alignment: Story = () => (
  <Wrapper>
    <Typography align="left">Left</Typography>
    <Typography align="center">Center</Typography>
    <Typography align="right">Right</Typography>
  </Wrapper>
);

export const TextLimitation: Story<TypographyProps> = args => (
  <Typography {...args}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis magni
    dolorum maiores autem neque? Aperiam provident culpa dignissimos nemo
    incidunt veritatis quam ullam sunt deserunt similique. Ea iusto quibusdam
    vero. Odit, fugit suscipit! Vel, blanditiis inventore! Expedita officia
    explicabo est aliquid voluptatem dolore dolorem sint aperiam qui,
    reprehenderit dolor reiciendis. Nisi omnis fuga saepe veniam sequi totam
    soluta aspernatur aperiam. Veniam iure nesciunt, ipsa reiciendis accusantium
    tempore cum aliquid saepe ad doloremque sit alias praesentium hic unde
    facilis? Accusantium nostrum iste eligendi laborum fuga recusandae sed
    perspiciatis corrupti unde fugit? Blanditiis quasi placeat in quas suscipit
    quisquam corporis delectus mollitia rem illum repudiandae, voluptate nulla
    commodi dignissimos. Adipisci, perferendis aut quisquam quasi optio commodi.
    Laborum perferendis nisi laudantium cumque? Aliquam. Error commodi earum
    unde doloremque! Laboriosam veniam magnam blanditiis provident eius! Eius
    voluptatum reprehenderit expedita tenetur numquam repellat unde natus
    aliquid quo qui voluptates at quod totam, commodi corrupti a!
  </Typography>
);

TextLimitation.args = {
  maxLines: 3,
};
