import React, { useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputPassword, { TInputPasswordProps } from './InputPassword';
import { Size } from '../../../../common/enum';

export default {
  title: 'Component/InputPassword',
  component: StoryInputPassword,
} as ComponentMeta<typeof StoryInputPassword>;

const InputPassword: Story<TInputPasswordProps> = (args) => {
  const [password, setPassword] = useState<string>();

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleDeletePassword = () => {
    setPassword('');
  };

  return (
    <StoryInputPassword
      {...args}
      name={'sample'}
      value={password || ''}
      placeholder={'this is placeholder'}
      onChange={handleChangePassword}
      onDelete={handleDeletePassword}
    />
  );
};
export const Basic = InputPassword.bind({});

Basic.args = {
  placeholder: 'this is placeholder',
  inputSize: Size.S,
  useClearBtn: false,
  onChange: () => {},
  onDelete: () => {},
};
