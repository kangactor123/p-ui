import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryClipboard, { IClipboardProps } from './Clipboard';

export default {
  title: 'Component/Clipboard',
  component: StoryClipboard,
} as ComponentMeta<typeof StoryClipboard>;

const Clipboard: Story<IClipboardProps> = (args) => <StoryClipboard {...args} />;

export const Basic = Clipboard.bind({});

Basic.args = {
  isEng: 'true',
  value: 'hello world',
  title: 'hello world',
};
