import React, { useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputPassword, { TInputPasswordProps } from './InputPassword';
import { Size } from '../../../../common/enum';
import { css } from '@emotion/react';

export default {
  title: 'Component/InputPassword',
  component: StoryInputPassword,
} as ComponentMeta<typeof StoryInputPassword>;

const InputPassword: Story<TInputPasswordProps> = (args) => {
  const [password, setPassword] = useState<string>();

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 300px;
      `}
    >
      <StoryInputPassword
        {...args}
        name={'sample'}
        value={password || ''}
        size={Size.M}
        placeholder={'this is medium size'}
        onChange={handleChangePassword}
      />
      <StoryInputPassword
        {...args}
        name={'sample'}
        value={password || ''}
        size={Size.S}
        placeholder={'this is small size'}
        onChange={handleChangePassword}
      />
    </div>
  );
};
export const Basic = InputPassword.bind({});

Basic.args = {
  placeholder: 'this is placeholder',
  size: Size.S,
  onChange: () => {},
};
