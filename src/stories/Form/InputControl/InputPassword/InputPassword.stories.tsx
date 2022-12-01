import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputPassword, { TInputPasswordProps } from './InputPassword';
import { TSample } from '../CodeEditor/CodeEditor.stories';
import { TSampleFormControl } from '../InputText/InputText.stories';
import { useForm } from 'react-hook-form';
import { Size } from '../../../../common/enum';

export default {
  title: 'Component/InputPassword',
  component: StoryInputPassword,
} as ComponentMeta<typeof StoryInputPassword>;

const InputPassword: Story<TInputPasswordProps<TSample>> = (args) => {
  const { control } = useForm<TSampleFormControl>({
    mode: 'all',
  });
  return (
    <StoryInputPassword
      {...args}
      control={control}
      rules={{ required: true }}
      name={'sample'}
      placeholder={'this is placeholder'}
    />
  );
};

const ErrorPassword: Story<TInputPasswordProps<TSample>> = (args) => {
  const { control } = useForm<TSampleFormControl>({
    mode: 'all',
  });
  return (
    <StoryInputPassword
      {...args}
      control={control}
      rules={{ required: true }}
      name={'sample'}
      placeholder={'this is placeholder'}
      isError={true}
      inputSize={Size.Large}
    />
  );
};

const NoClearButtonPassword: Story<TInputPasswordProps<TSample>> = (args) => {
  const { control } = useForm<TSampleFormControl>({
    mode: 'all',
  });
  return (
    <StoryInputPassword
      {...args}
      control={control}
      name={'sample'}
      rules={{ required: true }}
      placeholder={'this is placeholder'}
      inputSize={Size.Small}
      useClearBtn={false}
    />
  );
};

export const Basic = InputPassword.bind({});
export const Error = ErrorPassword.bind({});
export const NoClear = NoClearButtonPassword.bind({});
