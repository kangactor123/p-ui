import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputFile, { IInputFileProps } from './InputFile';

export default {
  title: 'Component/InputFile',
  component: StoryInputFile,
} as ComponentMeta<typeof StoryInputFile>;

const InputFile: Story<IInputFileProps> = (args) => <StoryInputFile {...args} />;

export const Basic = InputFile.bind({});
