import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StorySelect, { ISelectProps } from './Select';
import { TSample } from '../CodeEditor/CodeEditor.stories';
import { useForm } from 'react-hook-form';
import { TSampleFormControl } from '../InputText/InputText.stories';

export default {
  title: 'Component/Select',
  component: StorySelect,
} as ComponentMeta<typeof StorySelect>;

const tempOptions = [
  { label: 'first', value: 'first' },
  { label: 'second', value: 'second', disable: true },
  { label: 'third', value: 'third' },
  { label: 'fourth', value: 'fourth' },
];

const Select: Story<ISelectProps<TSample>> = (args) => {
  const { control } = useForm<TSampleFormControl>({
    mode: 'all',
  });
  return (
    <StorySelect
      {...args}
      control={control}
      rules={{ required: true }}
      name={'sample'}
      options={tempOptions}
      placeholder={'Select a JDK Version'}
    />
  );
};

export const Basic = Select.bind({});
