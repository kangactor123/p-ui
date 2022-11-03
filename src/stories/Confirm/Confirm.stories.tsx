import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryConfirm, { IConfirmProps } from './Confirm';

export default {
  title: 'Component/Confirm',
  component: StoryConfirm,
} as ComponentMeta<typeof StoryConfirm>;

const Confirm: Story<IConfirmProps> = (args) => <StoryConfirm {...args} />;

export const Basic = Confirm.bind({});
