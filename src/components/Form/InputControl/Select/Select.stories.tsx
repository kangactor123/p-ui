import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StorySelect, { ISelectProps } from './Select';
import { TSample } from '../CodeEditor/CodeEditor.stories';

export default {
  title: 'Component/Select',
  component: StorySelect,
} as ComponentMeta<typeof StorySelect>;

const tempOptions = [
  { label: 'first', value: 'first' },
  { label: 'second', value: 'second', disabled: true },
  { label: 'third', value: 'third' },
  { label: 'fourth', value: 'fourth' },
];

const Select: Story<ISelectProps<TSample>> = (args) => (
  <StorySelect
    {...args}
    options={tempOptions}
    renderValue={(value) => {
      const renderValue = tempOptions.find((option) => option.label === (value as string))?.label;
      return value ? renderValue : 'Select a JDK Version';
    }}
  />
);

export const Basic = Select.bind({});
