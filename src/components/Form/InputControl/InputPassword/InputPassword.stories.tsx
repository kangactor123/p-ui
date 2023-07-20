import React, { useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputPassword, { TInputPasswordProps } from './InputPassword';
import { Size } from '../../../../common/enum';

export default {
  title: 'Component/InputPassword',
  component: StoryInputPassword,
} as ComponentMeta<typeof StoryInputPassword>;

const InputPassword: Story<TInputPasswordProps> = (args) => (
  <StoryInputPassword {...args} name={'sample'} placeholder={'this is placeholder'} />
);
export const Basic = InputPassword.bind({});

Basic.args = {
  placeholder: 'this is placeholder',
  inputSize: Size.S,
  useClearBtn: false,
  setPassword: () => {},
};
