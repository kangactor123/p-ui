import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputPassword, { TInputPasswordProps } from './InputPassword';
import { TSample } from '../CodeEditor/CodeEditor.stories';
import { TSampleFormControl } from '../InputText/InputText.stories';
import { useForm } from 'react-hook-form';

export default {
  title: 'Component/InputPassword',
  component: StoryInputPassword,
} as ComponentMeta<typeof StoryInputPassword>;

const InputPassword: Story<TInputPasswordProps<TSample>> = (args) => {
  const { control } = useForm<TSampleFormControl>({
    mode: 'all',
    defaultValues: {
      sample: 'this is sample',
    },
  });
  return <StoryInputPassword {...args} control={control} rules={{ required: true }} name={'sample'} />;
};

export const Basic = InputPassword.bind({});
