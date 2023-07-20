import React, { useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputText, { TInputTextProps } from './InputText';
import { Size } from '../../../../common/enum';

export default {
  title: 'Component/InputText',
  component: StoryInputText,
} as ComponentMeta<typeof StoryInputText>;

export type TSampleFormControl = {
  sample: string;
};

const InputText: Story<TInputTextProps> = (args) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === '13') setValue(value);
  };

  const handleClearValue = () => {
    setValue('');
  };

  return (
    <StoryInputText
      {...args}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      handleClear={handleClearValue}
    />
  );
};

export const Basic = InputText.bind({});

Basic.args = {
  placeholder: 'this is placeholder',
  inputSize: Size.S,
  disabled: false,
  useClearBtn: false,
};
