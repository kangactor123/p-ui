import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputText, { TInputTextProps } from './InputText';
import { TSample } from '../CodeEditor/CodeEditor.stories';

export default {
  title: 'Component/InputText',
  component: StoryInputText,
} as ComponentMeta<typeof StoryInputText>;

const InputText: Story<TInputTextProps<TSample>> = (args) => <StoryInputText {...args} />;

export const Basic = InputText.bind({});
