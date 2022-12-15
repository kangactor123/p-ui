import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryRadio, { TRadioProps } from './Radio';
import { TSample } from '../CodeEditor/CodeEditor.stories';
import { useForm } from 'react-hook-form';
import { TSampleFormControl } from '../InputText/InputText.stories';
import { migratorRadioStyle } from './Radio.style';

export default {
  title: 'Component/Radio',
  component: StoryRadio,
} as ComponentMeta<typeof StoryRadio>;

const options = [
  { value: '1', label: '1', disabled: false },
  { value: '2', label: '2', disabled: true },
];

const Radio: Story<TRadioProps<TSample>> = (args) => {
  const { control } = useForm<TSampleFormControl>({
    mode: 'all',
    defaultValues: {
      sample: '1',
    },
  });

  return (
    <StoryRadio
      {...args}
      control={control}
      rules={{ required: true }}
      name={'sample'}
      radioStyle={migratorRadioStyle}
    />
  );
};

export const Migrator = Radio.bind({});

Migrator.args = {
  options: options,
};
