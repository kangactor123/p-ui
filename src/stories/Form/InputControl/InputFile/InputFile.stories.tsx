import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputFile, { TInputFileProps } from './InputFile';
import { TSample } from '../CodeEditor/CodeEditor.stories';
import { useForm } from 'react-hook-form';
import { TSampleFormControl } from '../InputText/InputText.stories';

export default {
  title: 'Component/InputFile',
  component: StoryInputFile,
} as ComponentMeta<typeof StoryInputFile>;

const InputFile: Story<TInputFileProps<TSample>> = (args) => {
  const { control } = useForm<TSampleFormControl>({
    mode: 'all',
    defaultValues: {
      sample: 'this is sample',
    },
  });
  return <StoryInputFile {...args} control={control} rules={{ required: true }} name={'sample'} />;
};

export const Basic = InputFile.bind({});
