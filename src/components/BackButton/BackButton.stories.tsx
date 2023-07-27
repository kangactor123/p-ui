import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryBackButton from './BackButton';
import { IBackButton } from './type';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Component/BackButton',
  component: StoryBackButton,
} as ComponentMeta<typeof StoryBackButton>;

const BackButton: Story<IBackButton> = (args) => (
  <BrowserRouter>
    <StoryBackButton {...args} />
  </BrowserRouter>
);

export const Basic = BackButton.bind({});
