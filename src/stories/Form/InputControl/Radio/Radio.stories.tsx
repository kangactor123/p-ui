import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryRadio, { TRadioProps } from './Radio';
import { TSample } from '../CodeEditor/CodeEditor.stories';

export default {
  title: 'Component/Radio',
  component: StoryRadio,
} as ComponentMeta<typeof StoryRadio>;

const Radio: Story<TRadioProps<TSample>> = (args) => <StoryRadio {...args} />;

export const Basic = Radio.bind({});
