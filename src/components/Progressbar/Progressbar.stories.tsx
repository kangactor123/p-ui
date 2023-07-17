import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryProgressbar, { IProgressbarProps } from './Progressbar';

export default {
  title: 'Component/Progressbar',
  component: StoryProgressbar,
} as ComponentMeta<typeof StoryProgressbar>;

const Progressbar: Story<IProgressbarProps> = (args) => {
  const { value = 50, backgroundColor = '#c4c9d3', progressColor = '#4285f4' } = args;
  return <StoryProgressbar {...args} value={value} progressColor={progressColor} backgroundColor={backgroundColor} />;
};

export const Basic = Progressbar.bind({});
