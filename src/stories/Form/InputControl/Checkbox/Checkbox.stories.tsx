import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryCheckbox, { ICheckboxProps } from './Checkbox';

export default {
  title: 'Component/Checkbox',
  component: StoryCheckbox,
} as ComponentMeta<typeof StoryCheckbox>;

const Checkbox: Story<ICheckboxProps> = (args) => <StoryCheckbox {...args} label="test" />;

export const Basic = Checkbox.bind({});
