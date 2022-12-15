import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryCheckbox, { ICheckboxProps } from './Checkbox';
import { migratorCheckboxStyle } from './Checkbox.style';

export default {
  title: 'Component/Checkbox',
  component: StoryCheckbox,
} as ComponentMeta<typeof StoryCheckbox>;

const Checkbox: Story<ICheckboxProps> = (args) => <StoryCheckbox {...args} />;

export const Migrator = Checkbox.bind({});

Migrator.args = {
  label: 'test',
  disabled: false,
  checked: false,
  labelProps: {
    sx: migratorCheckboxStyle,
  },
};
