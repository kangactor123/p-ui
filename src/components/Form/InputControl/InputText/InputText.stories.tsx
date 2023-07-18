import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputText, { TInputTextProps } from './InputText';
import { TSample } from '../CodeEditor/CodeEditor.stories';
import { useForm } from 'react-hook-form';
import { Size } from '../../../../common/enum';

export default {
  title: 'Component/InputText',
  component: StoryInputText,
} as ComponentMeta<typeof StoryInputText>;

export type TSampleFormControl = {
  sample: string;
};

const InputText: Story<TInputTextProps<TSample>> = (args) => {
  const { control } = useForm<TSampleFormControl>({
    mode: 'all',
    // defaultValues: {
    //   sample: 'this is sample',
    // },
  });
  return <StoryInputText {...args} control={control} rules={{ required: true }} />;
};

export const Basic = InputText.bind({});

Basic.args = {
  name: 'sample',
  placeholder: 'this is placeholder',
  isError: true,
  inputSize: Size.L,
};
