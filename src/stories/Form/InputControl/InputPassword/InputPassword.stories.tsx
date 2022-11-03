import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputPassword, { IInputPasswordProps } from './InputPassword';

export default {
  title: 'Component/InputPassword',
  component: StoryInputPassword,
} as ComponentMeta<typeof StoryInputPassword>;

const InputPassword: Story<IInputPasswordProps> = (args) => <StoryInputPassword {...args} />;

export const Basic = InputPassword.bind({});
