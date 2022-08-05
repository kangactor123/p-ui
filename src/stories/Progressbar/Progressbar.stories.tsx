import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryProgressbar, { IProgressbarProps } from './Progressbar';

export default {
  title: 'Component/Progressbar',
  component: StoryProgressbar,
} as ComponentMeta<typeof StoryProgressbar>;

const Progressbar: Story<IProgressbarProps> = (args) => <StoryProgressbar {...args} />;

export const Basic = Progressbar.bind({});
