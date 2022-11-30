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
    // defaultValues: {
    //   sample: 'this is sample',
    // },
  });
  return (
    <StoryInputPassword
      {...args}
      control={control}
      rules={{ required: true }}
      name={'sample'}
      placeholder={'this is placeholder'}
      isError={true}
      // size={Size.Small}
    />
  );
};

export const Basic = InputPassword.bind({});
