import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputFile, { TInputFileProps } from './InputFile';

export default {
  title: 'Component/InputFile',
  component: StoryInputFile,
} as ComponentMeta<typeof StoryInputFile>;

const InputFile: Story<TInputFileProps> = (args) => <StoryInputFile {...args} name={'sample'} />;
export const Basic = InputFile.bind({});
